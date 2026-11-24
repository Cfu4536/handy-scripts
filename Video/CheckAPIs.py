import csv
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.client import HTTPException
from pathlib import Path
from tempfile import NamedTemporaryFile
from urllib.error import HTTPError
from urllib.parse import parse_qsl, urlencode, urlsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree


VIDEO_DIR = Path(__file__).resolve().parent
TIMEOUT_SECONDS = 8
MAX_WORKERS = 8
MAX_RESPONSE_BYTES = 2 * 1024 * 1024


def load_sources():
    sources = {}
    libre_path = VIDEO_DIR / "LibreTV.txt"
    lines = libre_path.read_text(encoding="utf-8-sig").splitlines()
    for line_number, line in enumerate(lines, 1):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        name, _, url = (part.strip() for part in line.partition(","))
        if not name or not url:
            raise ValueError(f"{libre_path.name} 第 {line_number} 行应为“名称,接口”")
        sources.setdefault(url, name)

    echo_path = VIDEO_DIR / "EchoTV.json"
    config = json.loads(echo_path.read_text(encoding="utf-8-sig"))
    if not isinstance(config, dict) or not isinstance(config.get("sources"), list):
        raise ValueError(f"{echo_path.name} 的 sources 应为数组")
    for index, source in enumerate(config["sources"], 1):
        if not isinstance(source, dict) or any(
            not isinstance(source.get(field), str) or not source[field].strip()
            for field in ("name", "url")
        ):
            raise ValueError(f"{echo_path.name} 的 sources 第 {index} 项缺少有效的 name 或 url")
        sources.setdefault(source["url"].strip(), source["name"].strip())
    return sources


def has_video_list(body):
    try:
        data = json.loads(body)
    except (ValueError, RecursionError):
        try:
            root = ElementTree.fromstring(body)
        except (ElementTree.ParseError, LookupError, ValueError):
            return False
        return root.tag == "rss" and any(
            video.findtext("id", "").strip() and video.findtext("name", "").strip()
            for video in root.findall("list/video")
        )

    if not isinstance(data, dict) or str(data.get("code")) != "1":
        return False
    videos = data.get("list")
    return isinstance(videos, list) and any(
        isinstance(video, dict)
        and type(video.get("vod_id")) in (int, str)
        and str(video["vod_id"]).strip()
        and isinstance(video.get("vod_name"), str)
        and video["vod_name"].strip()
        for video in videos
    )


def check_source(url):
    try:
        endpoint = urlsplit(url)
        if endpoint.scheme not in ("http", "https") or not endpoint.hostname:
            return "地址必须是有效的 HTTP 或 HTTPS URL"
        params = [
            (key, value)
            for key, value in parse_qsl(endpoint.query, keep_blank_values=True)
            if key not in ("ac", "pg")
        ]
        params.extend([("ac", "list"), ("pg", "1")])
        probe_url = endpoint._replace(query=urlencode(params), fragment="").geturl()
        request = Request(probe_url, headers={"User-Agent": "MacCMS-Endpoint-Check/1.0"})
        with urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            body = response.read(MAX_RESPONSE_BYTES + 1)
    except HTTPError as error:
        return f"HTTP {error.code}"
    except (OSError, HTTPException, ValueError) as error:
        return f"请求失败（{error}）"

    if len(body) > MAX_RESPONSE_BYTES:
        return "响应超过 2 MiB"
    if not has_video_list(body):
        return "未返回含有效视频条目的苹果 CMS 列表"
    return None


def write_results(output_path, rows):
    temporary_path = None
    try:
        with NamedTemporaryFile(
            mode="w", encoding="utf-8", newline="", dir=output_path.parent, delete=False
        ) as output:
            temporary_path = Path(output.name)
            csv.writer(output).writerows(rows)
        temporary_path.replace(output_path)
    finally:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)


def main():
    output_path = VIDEO_DIR / "CheckResults.txt"
    try:
        sources = load_sources()
        available = set()
        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            checks = {executor.submit(check_source, url): url for url in sources}
            for check in as_completed(checks):
                url = checks[check]
                error = check.result()
                if error is None:
                    available.add(url)
                    print(f"[可用] {sources[url]} {url}")
                else:
                    print(f"[未通过] {sources[url]} {url} · {error}")

        rows = ((name, url) for url, name in sources.items() if url in available)
        write_results(output_path, rows)
    except (OSError, ValueError) as error:
        print(f"检查中止：{error}", file=sys.stderr)
        return 1

    print(f"共检查 {len(sources)} 个接口，{len(available)} 个可用。结果已写入 {output_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
