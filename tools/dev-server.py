"""Local preview server with caching switched off.

python -m http.server sends no Cache-Control, so browsers fall back to
heuristic caching and happily keep serving yesterday's HTML, CSS and JS.
During a redesign that means you edit a file, reload, and see the old page —
which cost us several rounds of chasing bugs that were already fixed.

    python tools/dev-server.py [port]

Defaults to 3101. Never use this for anything but local preview.
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # one line per request, errors first so they are easy to grep
        sys.stderr.write('%s %s\n' % (self.address_string(), fmt % args))


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3101
    handler = partial(NoCacheHandler, directory='.')
    print(f'serving http://localhost:{port}  (no-store)')
    ThreadingHTTPServer(('127.0.0.1', port), handler).serve_forever()
