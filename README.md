# Pastor Q Wilson

Pastor Q Wilson's website, updated from `L:\dev\pastor-q-site`.

The homepage presents his ministry, wedding officiating, speaking engagements,
and booking information in a responsive, single-page design.

## Structure

- `public/index.html` — homepage, including its styles and interactions.
- `public/assets/` — homepage images and logo.
- `src/routes/index.tsx` — TanStack Start route redirecting `/` to `/index.html`.
- Other directories under `public/` retain the previous site's pages and assets.

## Run locally

For the static website:

```sh
python -m http.server 8000 --directory public
```

For the Lovable/TanStack application, install dependencies with `bun install`,
then run `bun run dev`. Build with `bun run build`.

## Booking inquiries

The homepage form opens the visitor's email app with an inquiry addressed to
`pastorq@torontoic.com`. The visitor must send that email to complete the inquiry.
Google Fonts requires an internet connection; the stylesheet includes system
font fallbacks.
