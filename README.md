# clean-slate-canvas

A static mirror of **qswilson.com** (Q Wilson — Inspire, Connect and Captivate),
captured on 2026-06-21.

## What this is
A faithful, self-contained static snapshot of the live WordPress site. All HTML
pages, CSS, JavaScript, images, and fonts are stored locally and internal asset
links have been rewritten to relative paths, so the site renders offline and can
be hosted on any static web host (GitHub Pages, Netlify, Vercel, S3, etc.).

## Structure
- `index.html` — homepage
- `contact-us/`, `service/`, `service-category/`, `category/`, `2023/...` — pages
- `wp-content/`, `wp-includes/` — themes, plugins, uploads, scripts, styles

## Notes
- This is a STATIC copy. WordPress dynamic features (contact form submission,
  search, comments) won't process server-side.
- A few links point back to the live site for endpoints that cannot be made
  static: RSS feeds (`/feed/`), the REST API (`/wp-json/`), `xmlrpc.php`, and
  tag/author archive pages that weren't part of the capture.
- Directory-style page links (e.g. `/service/public-speaking/`) resolve to their
  `index.html` automatically when served by a web server.

## Run locally
```
python3 -m http.server 8000
# then open http://localhost:8000
```
