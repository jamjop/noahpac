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
| `sti-guide/` | STI Treatment Guidelines | CDC 2021 full guidelines with monitoring scripts |
| `abx/` | Antibiotic Reference | Empiric coverage for 17 infections across 6 categories |
| `antibiogram/` | ND Antibiogram | Local susceptibility data for 4 ND facilities (2023–2024); import-from-PDF feature |
| `empiric/` | Empiric Therapy + Local Susceptibility | Treatment recommendations cross-referenced with local antibiogram data |
| `allergy/` | Antibiotic Allergy Cross-Reactivity | Cross-reactivity reference for penicillin/cephalosporin/carbapenem allergies |
| `tccc/` | TCCC Field Reference | Tactical Combat Casualty Care quick reference (PWA) |
| `calculators/` | Clinical Calculators | ASCVD, CHA₂DS₂-VASc, Wells DVT/PE/PERC, CURB-65, CrCl, eGFR, MELD, PHQ-9, GAD-7, HEART, Ottawa rules |
| `opioids/` | Opioid Conversion | Equianalgesic conversion with MME and CDC risk thresholds |
| `naloxone/` | Naloxone & Overdose Reference | Dosing, routes, and ND overdose data; quarterly monitoring for ND HHS updates |
| `sepsis/` | Sepsis Screening | qSOFA + SOFA scoring |
| `wound/` | Wound Classification & Tetanus | Wound classification and tetanus prophylaxis guide |
| `lookup/` | Code & Drug Lookup | ICD-10, RxTerms, LOINC live search via NLM Clinical Tables API |
| `drugref/` | Drug Reference | FDA drug labels and recall search via openFDA |
| `peds/` | Pediatric Dosing | Broselow-style dosing card by weight or age |
| `vaccines/` | ACIP Immunization Schedule | Full birth-to-adult schedule |
| `screener/` | USPSTF Screener | USPSTF A/B/C preventive services by age and sex |
| `reportable/` | ND Reportable Conditions | ND HHS reportable conditions list; quarterly monitoring for updates |

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

Quarterly crons (Jan/Apr/Jul/Oct 15th) monitor ND HHS sources for updates:
- `/var/www/reportable/check_updates.py` — ND reportable conditions PDF
- `/var/www/sti-guide/check_updates.py` — CDC STI guidelines page
- `/var/www/naloxone/check_updates.py` — ND HHS behavioral health data

All three send Pushover notifications on change.

## Backend Services

`antibiogram/` has a server-side PDF extraction API:

- **Service:** `antibiogram-api.service` (systemd, runs as www-data on 127.0.0.1:8765)
- **Source:** `/var/www/antibiogram/api_server.py` + `pdf_to_js.py`
- **Config:** `/etc/antibiogram-api.env` (holds `ANTHROPIC_API_KEY`)
- **Nginx:** proxied at `/antibiogram/api/`

Used by the import panel to extract facility data from ND HHS antibiogram PDFs via Claude vision.

## External APIs

| App | API |
|---|---|
| `lookup/` | [NLM Clinical Tables](https://clinicaltables.nlm.nih.gov/) |
| `drugref/` | [openFDA](https://open.fda.gov/) |
| `screener/` | [USPSTF Prevention TaskForce](https://www.uspreventiveservicestaskforce.org/apps/api.jsp) |
| `antibiogram/` | [Anthropic Claude](https://console.anthropic.com/) (server-side only, via API key) |

All other tools are fully offline — no external requests at runtime.

---

**Not medical advice.** All content should be verified against primary sources and individualized with clinical judgment.
