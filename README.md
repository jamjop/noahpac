# noahpac.com

Clinical reference portal for [noahpac.com](https://noahpac.com). Built for point-of-care use — fast, mobile-friendly, no login required.

## Structure

This repo holds all deployed files for the portal.

**Root** — React/Vite SPA (`index.html` + `assets/`) serves as the portal shell and navigation layer. Built from the [`replit` branch](https://github.com/jamjop/noahpac/tree/replit).

**Tool subdirectories** — Pure static HTML/CSS/JS apps, each served independently by nginx and loaded in the SPA via iframes:

| Directory | App | Description |
|---|---|---|
| `labs/` | Lab Reference | 181 adult lab tests, 14 categories, searchable |
| `ddx/` | Lab Differentials | Differential diagnoses by lab value (high/low), 30+ labs |
| `sti/` | STI Treatment Reference | CDC-aligned empiric treatment by diagnosis |
| `abx/` | Antibiotic Reference | Empiric coverage for 17 infections across 6 categories |
| `tccc/` | TCCC Field Reference | Tactical Combat Casualty Care quick reference (PWA) |
| `calculators/` | Clinical Calculators | ASCVD, CHA₂DS₂-VASc, Wells DVT/PE/PERC, CURB-65, CrCl, eGFR, MELD, PHQ-9, GAD-7, HEART, Ottawa rules |
| `opioids/` | Opioid Conversion | Equianalgesic conversion with MME and CDC risk thresholds |
| `lookup/` | Code & Drug Lookup | ICD-10, RxTerms, LOINC live search via NLM Clinical Tables API |
| `drugref/` | Drug Reference | FDA drug labels and recall search via openFDA |
| `peds/` | Pediatric Dosing | Broselow-style dosing card by weight or age |
| `vaccines/` | ACIP Immunization Schedule | Full birth-to-adult schedule |
| `screener/` | USPSTF Screener | USPSTF A/B/C preventive services by age and sex |

**Shared assets:**
- `shared.css` — CSS design tokens and base styles used by all tool apps
- `favicon.svg`, `opengraph.jpg`, `robots.txt` — portal-level assets

## Deployment

The portal is deployed to a self-hosted Ubuntu server behind Cloudflare (mTLS enforced). Nginx serves files from `/var/www/noahpac.com/` with alias directives for each tool subdirectory.

```
/var/www/noahpac.com/    ← this repo (main branch)
/var/www/labs/           ← nginx alias for /labs/ (live edits go here)
/var/www/ddx/            ← nginx alias for /ddx/
...
```

The `main` branch reflects deployed state. Tool subdirectories here serve as canonical source; live edits land in `/var/www/XXX/` and should be synced back.

## SPA Source

The React portal shell lives in the [`replit` branch](https://github.com/jamjop/noahpac/tree/replit) under `artifacts/noahpac/`. Built with Vite 7 + wouter + Tailwind + Radix UI. Requires Node ≥20.19.

```bash
cd artifacts/noahpac
pnpm install
pnpm build        # output → dist/public/
# copy dist/public/* to /var/www/noahpac.com/
```

## Data Updates

The USPSTF screener (`screener/`) fetches live data from the Prevention TaskForce API. A weekly cron (Monday 04:17) runs `screener/update_uspstf.py`:

```bash
USPSTF_API_KEY=yourkey python3 screener/update_uspstf.py
```

An API key can be requested from uspstfpda@ahrq.gov.

## External APIs

| App | API |
|---|---|
| `lookup/` | [NLM Clinical Tables](https://clinicaltables.nlm.nih.gov/) |
| `drugref/` | [openFDA](https://open.fda.gov/) |
| `screener/` | [USPSTF Prevention TaskForce](https://www.uspreventiveservicestaskforce.org/apps/api.jsp) |

All other tools are fully offline — no external requests at runtime.

---

**Not medical advice.** All content should be verified against primary sources and individualized with clinical judgment.
