# noahpac — Clinical Reference Tools

Point-of-care clinical reference for Noah PA-C. Preventive screenings, calculators, drug references, and field medicine protocols. 100% client-side — works offline, no account required.

## Tools

| Route | Tool |
|---|---|
| `/screener` | USPSTF Preventive Screener |
| `/vaccines` | Immunization Schedule (ACIP) |
| `/calculators` | Medical Calculators (13) |
| `/opioids` | Opioid Conversion (MME) |
| `/sti` | STI Treatment (CDC 2021) |
| `/abx` | Antibiotic Reference (IDSA) |
| `/labs` | Lab Reference Ranges |
| `/tccc` | TCCC / MARCH PAWS (PWA, offline) |
| `/lookup` | Code & Drug Lookup (NLM) |
| `/drugref` | Drug Reference (openFDA) |
| `/peds` | Pediatric Dosing |
| `/labdiff` | Lab Differentials (DDx) |

## Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS 4, Wouter
- **Tools**: Vanilla HTML/CSS/JS static files embedded in iframes
- **Backend**: None — all clinical logic runs client-side

## Local development

Requires Node.js 20+ and pnpm.

```bash
pnpm install
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/noahpac run dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm install
pnpm --filter @workspace/noahpac run build
```

Output is written to `artifacts/noahpac/dist/public/`. This directory contains the React SPA (`index.html`, bundled JS/CSS) and all tool static files (`/screener/`, `/calculators/`, etc.).

`PORT` and `BASE_PATH` are **not** required for `build` — they default to `3000` and `/` respectively. Set `BASE_PATH` only if the app is served from a subpath (e.g. `BASE_PATH=/tools`).

## nginx deployment

Point nginx at `artifacts/noahpac/dist/public/`. The React router handles all `/slug` routes client-side, so nginx must fall back to `index.html` for unknown paths.

```nginx
server {
    listen 80;
    server_name noahpac.com www.noahpac.com;

    root /var/www/noahpac/dist/public;
    index index.html;

    # Serve pre-built tool static files directly (e.g. /screener/index.html)
    # These are already inside dist/public/ after the Vite build
    location ~* \.(js|css|png|svg|ico|json|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA fallback — all other paths serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

For HTTPS with Certbot:

```bash
sudo certbot --nginx -d noahpac.com -d www.noahpac.com
```

### TCCC offline / PWA

The TCCC tool (`/tccc/`) registers a service worker from within its iframe. Because service workers are scoped by path, the worker only controls `/tccc/` requests — no impact on the rest of the site. No special nginx config needed.

### Deploying updates

```bash
git pull
pnpm install
pnpm --filter @workspace/noahpac run build
# rsync or copy dist/public/ to your server root
```

## Repo structure

```
artifacts/noahpac/
├── src/                  # React SPA (landing page + iframe router)
│   ├── App.tsx           # Route definitions
│   ├── pages/Home.tsx    # Landing page with tool cards
│   └── pages/ToolPage.tsx# Full-page iframe wrapper
├── public/               # Static tool files (copied into dist on build)
│   ├── shared.css        # Design tokens shared across all tools
│   ├── screener/         # USPSTF Screener (HTML/CSS/JS)
│   ├── calculators/      # Medical Calculators
│   ├── abx/              # Antibiotic Reference
│   └── ...               # One directory per tool
└── vite.config.ts
```

## Adding a new tool

1. Create `artifacts/noahpac/public/<slug>/index.html` (reference `/shared.css` for consistent styling)
2. Add a route in `src/App.tsx`
3. Add a card in `src/pages/Home.tsx`
4. Rebuild and redeploy
