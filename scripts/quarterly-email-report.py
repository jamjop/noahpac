#!/usr/bin/env python3
"""
quarterly-email-report.py — compile and email a clinical guidelines surveillance
report from a structured JSON file written by check_updates / auto_update scripts.

Each monitored script appends its structured result to a shared
/tmp/<prefix>-YYYY-MM-DD.json file via _write_report_result().
This script reads that file, formats a single HTML email covering all
results, and delivers it via msmtp.

Usage:
    # quarterly (default):
    /usr/bin/python3 quarterly-email-report.py

    # custom cadence:
    /usr/bin/python3 quarterly-email-report.py \
        --report-prefix antibiogram-report \
        --title "ND Antibiogram Monthly Update" \
        --expected '[["antibiogram","ND Antibiogram","https://noahpac.com/antibiogram/"]]'

Cron (quarterly):   45 6 15 1,4,7,10 *
Cron (antibiogram): 30 5 1 * *   (via antibiogram-email-report.sh)
Cron (uspstf):      30 4 * * 1   (via uspstf-email-report.sh)
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

# Set these in your crontab or environment:
#   NOAHPAC_REPORT_EMAIL  — recipient address (required)
#   NOAHPAC_FROM_EMAIL    — sender address   (optional, default below)
RECIPIENT  = os.environ.get('NOAHPAC_REPORT_EMAIL', '').strip()
FROM_ADDR  = os.environ.get('NOAHPAC_FROM_EMAIL', 'admin@noahpac.example').strip()
FROM_LABEL = "noahpac Clinical Monitor"

# Default expected list for the quarterly run
_QUARTERLY_EXPECTED = [
    ('reportable', 'ND Reportable Conditions',       'https://noahpac.com/reportable/'),
    ('sti-guide',  'CDC STI Treatment Guidelines',   'https://noahpac.com/sti-guide/'),
    ('naloxone',   'ND Overdose / Naloxone Data',    'https://noahpac.com/naloxone/'),
    ('abx',        'Antibiotic Reference',           'https://noahpac.com/abx/'),
    ('tccc',       'TCCC / CoTCCC Guidelines',       'https://noahpac.com/tccc/'),
    ('vaccines',   'ACIP Vaccine Schedules',         'https://noahpac.com/vaccines/'),
    ('sti',        'STI Treatment Reference',        'https://noahpac.com/sti/'),
]

STATUS_LABEL = {
    'changed':   'REVIEW NEEDED',
    'no_change': 'No change',
    'refreshed': 'Refreshed',
    'error':     'ERROR',
    'missing':   'Did not report',
}

STATUS_COLOR = {
    'changed':   '#b45309',   # amber-700
    'no_change': '#166534',   # green-800
    'refreshed': '#166534',
    'error':     '#991b1b',   # red-800
    'missing':   '#991b1b',
}

STATUS_BG = {
    'changed':   '#fef3c7',   # amber-100
    'no_change': '#f0fdf4',   # green-50
    'refreshed': '#f0fdf4',
    'error':     '#fef2f2',   # red-50
    'missing':   '#fef2f2',
}


def parse_args() -> argparse.Namespace:
    ap = argparse.ArgumentParser(description='Send consolidated noahpac.com monitoring email')
    ap.add_argument('--report-prefix', default='quarterly-report',
                    help='Prefix for /tmp/<prefix>-YYYY-MM-DD.json (default: quarterly-report)')
    ap.add_argument('--title', default='Quarterly Clinical Guidelines Review',
                    help='Report title shown in email header and subject line')
    ap.add_argument('--expected', default=None,
                    help='JSON array of [id, name, url] triples; scripts not in report appear as missing')
    return ap.parse_args()


def load_results(report_file: Path) -> list[dict]:
    if not report_file.exists():
        return []
    return json.loads(report_file.read_text())


def merge_expected(results: list[dict], expected: list[tuple]) -> list[dict]:
    """Add placeholder entries for scripts that didn't write a result."""
    reported = {r['app_id'] for r in results}
    merged = list(results)
    for app_id, app_name, app_url in expected:
        if app_id not in reported:
            merged.append({
                'app_id':   app_id,
                'app_name': app_name,
                'app_url':  app_url,
                'status':   'missing',
                'findings': [],
                'ran_at':   None,
            })
    order = {app_id: i for i, (app_id, _, _) in enumerate(expected)}
    merged.sort(key=lambda r: order.get(r['app_id'], 99))
    return merged


def esc(s: str) -> str:
    return (str(s)
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;'))


def render_findings(findings: list[dict]) -> str:
    if not findings:
        return ''
    rows = []
    for f in findings:
        if 'pmid' in f:
            pmid_link = (f'<a href="https://pubmed.ncbi.nlm.nih.gov/{esc(f["pmid"])}/" '
                         f'style="color:#1d4ed8">PMID {esc(f["pmid"])}</a>')
            rows.append(
                f'<div style="margin:10px 0;padding:10px 12px;background:#fff;'
                f'border-radius:4px;border:1px solid #e5e7eb">'
                f'<div style="font-size:10px;text-transform:uppercase;letter-spacing:.06em;'
                f'color:#6b7280;margin-bottom:4px">{esc(f.get("search",""))}</div>'
                f'<div style="font-weight:600;font-size:13px">{esc(f.get("title",""))}</div>'
                f'<div style="font-size:12px;color:#374151;margin-top:3px">'
                f'{esc(f.get("journal",""))} {esc(f.get("pubdate",""))} — {pmid_link}</div>'
                f'</div>'
            )
        else:
            rows.append(
                f'<div style="margin:8px 0;padding:8px 12px;background:#fff;'
                f'border-radius:4px;border:1px solid #e5e7eb;font-size:13px">'
                f'{esc(f.get("detail", str(f)))}</div>'
            )
    return '\n'.join(rows)


def render_app_block(r: dict) -> str:
    status  = r['status']
    color   = STATUS_COLOR.get(status, '#6b7280')
    bg      = STATUS_BG.get(status, '#f9fafb')
    label   = STATUS_LABEL.get(status, status)
    n_find  = len(r['findings'])
    ran     = r.get('ran_at') or '—'
    findings_html = render_findings(r['findings'])

    badge = (f'<span style="display:inline-block;padding:2px 8px;border-radius:50px;'
             f'font-size:11px;font-weight:700;background:{color};color:#fff">'
             f'{label}</span>')

    count_str = f'{n_find} finding{"s" if n_find != 1 else ""}' if n_find else ''

    return (
        f'<div style="margin-bottom:16px;border-radius:6px;border:1px solid #e5e7eb;'
        f'overflow:hidden">'
        f'<div style="padding:12px 16px;background:{bg};display:flex;'
        f'justify-content:space-between;align-items:center">'
        f'<div>'
        f'<a href="{esc(r["app_url"])}" style="font-weight:700;font-size:14px;'
        f'color:#111827;text-decoration:none">{esc(r["app_name"])}</a>'
        f'{"  &nbsp;" + count_str if count_str else ""}'
        f'</div>'
        f'<div style="display:flex;align-items:center;gap:10px">'
        f'<span style="font-size:11px;color:#6b7280">{esc(ran)}</span>'
        f'{badge}'
        f'</div>'
        f'</div>'
        f'{("<div style=\"padding:12px 16px\">" + findings_html + "</div>") if findings_html else ""}'
        f'</div>'
    )


def build_html(results: list[dict], run_date: str, title: str, report_file: Path) -> str:
    changed  = [r for r in results if r['status'] == 'changed']
    problems = [r for r in results if r['status'] in ('error', 'missing')]
    clean    = [r for r in results if r['status'] in ('no_change', 'refreshed')]

    n_total   = len(results)
    n_changed = len(changed)
    n_clean   = len(clean)
    n_prob    = len(problems)

    summary_rows = ''
    for r in results:
        color = STATUS_COLOR.get(r['status'], '#6b7280')
        label = STATUS_LABEL.get(r['status'], r['status'])
        n     = len(r['findings'])
        summary_rows += (
            f'<tr>'
            f'<td style="padding:7px 12px"><a href="{esc(r["app_url"])}" '
            f'style="color:#1d4ed8;font-weight:600">{esc(r["app_name"])}</a></td>'
            f'<td style="padding:7px 12px;text-align:center">'
            f'<span style="color:{color};font-weight:700">{label}</span></td>'
            f'<td style="padding:7px 12px;text-align:center;color:#374151">'
            f'{"—" if not n else n}</td>'
            f'</tr>'
        )

    actionable_section = ''
    if changed:
        blocks = '\n'.join(render_app_block(r) for r in changed)
        actionable_section = f'''
<h2 style="color:#92400e;font-size:16px;margin:28px 0 12px;padding-bottom:6px;
border-bottom:2px solid #f59e0b">Review Required ({n_changed})</h2>
{blocks}'''

    problem_section = ''
    if problems:
        blocks = '\n'.join(render_app_block(r) for r in problems)
        problem_section = f'''
<h2 style="color:#991b1b;font-size:16px;margin:28px 0 12px;padding-bottom:6px;
border-bottom:2px solid #fca5a5">Errors / Did Not Report ({n_prob})</h2>
{blocks}'''

    clean_section = ''
    if clean:
        items = ''.join(
            f'<li style="padding:4px 0;color:#166534">'
            f'<a href="{esc(r["app_url"])}" style="color:#166534;font-weight:600">'
            f'{esc(r["app_name"])}</a> — {STATUS_LABEL.get(r["status"], "ok")}</li>'
            for r in clean
        )
        clean_section = f'''
<h2 style="color:#166534;font-size:16px;margin:28px 0 12px;padding-bottom:6px;
border-bottom:2px solid #86efac">No Changes ({n_clean})</h2>
<ul style="list-style:none;margin:0;padding:0;font-size:13px">{items}</ul>'''

    # Show findings for refreshed/no_change items that have them
    clean_with_findings = [r for r in clean if r['findings']]
    clean_findings_section = ''
    if clean_with_findings:
        blocks = '\n'.join(render_app_block(r) for r in clean_with_findings)
        clean_findings_section = f'<div style="margin-top:12px">{blocks}</div>'

    return f'''<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:8px;
box-shadow:0 1px 3px rgba(0,0,0,.1);overflow:hidden">

  <!-- Header -->
  <div style="background:#1e3a5f;padding:24px 28px">
    <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;
    color:#93c5fd;margin-bottom:6px">noahpac.com</div>
    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:800">
      {esc(title)}</h1>
    <div style="margin-top:6px;color:#bfdbfe;font-size:13px">{run_date}</div>
  </div>

  <div style="padding:24px 28px">

    <!-- Summary banner -->
    <div style="padding:14px 18px;border-radius:6px;margin-bottom:24px;
    background:{"#fef3c7" if changed else "#f0fdf4"};
    border:1px solid {"#fde68a" if changed else "#bbf7d0"}">
      <div style="font-weight:700;font-size:14px;color:{"#92400e" if changed else "#166534"}">
        {"⚠ " + str(n_changed) + " app" + ("s" if n_changed != 1 else "") + " require review"
         if changed else "✓ All checks passed — no changes requiring review"}
      </div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px">
        {n_total} apps checked &nbsp;·&nbsp;
        {n_changed} with findings &nbsp;·&nbsp;
        {n_clean} no change &nbsp;·&nbsp;
        {n_prob} error/missing
      </div>
    </div>

    <!-- Summary table -->
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:8px">
      <thead>
        <tr style="background:#f9fafb;border-bottom:2px solid #e5e7eb">
          <th style="padding:8px 12px;text-align:left;font-weight:700;color:#374151">App</th>
          <th style="padding:8px 12px;text-align:center;font-weight:700;color:#374151">Status</th>
          <th style="padding:8px 12px;text-align:center;font-weight:700;color:#374151">Findings</th>
        </tr>
      </thead>
      <tbody>{summary_rows}</tbody>
    </table>

    {actionable_section}
    {problem_section}
    {clean_section}
    {clean_findings_section}

    <!-- Footer -->
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;
    font-size:11px;color:#9ca3af">
      Generated by quarterly-email-report.py on {run_date}<br>
      Report file: {esc(str(report_file))}<br>
      To update an app: SSH to noahflix-server and edit the appropriate file in
      /var/www/noahpac-portal/ or /var/www/, then git push.
    </div>
  </div>
</div>
</body>
</html>'''


def send_email(subject: str, html_body: str) -> None:
    msg = (
        f"From: {FROM_LABEL} <{FROM_ADDR}>\r\n"
        f"To: {RECIPIENT}\r\n"
        f"Subject: {subject}\r\n"
        f"MIME-Version: 1.0\r\n"
        f"Content-Type: text/html; charset=utf-8\r\n"
        f"\r\n"
        f"{html_body}"
    )
    result = subprocess.run(
        ['msmtp', RECIPIENT],
        input=msg.encode('utf-8'),
        capture_output=True,
    )
    if result.returncode != 0:
        print(f"msmtp error: {result.stderr.decode()}", file=sys.stderr)
        sys.exit(1)


def main() -> int:
    args = parse_args()
    report_file = Path(f"/tmp/{args.report_prefix}-{date.today()}.json")
    title = args.title

    if args.expected:
        expected: list[tuple] = [(t[0], t[1], t[2]) for t in json.loads(args.expected)]
    else:
        expected = _QUARTERLY_EXPECTED

    if not RECIPIENT:
        print("ERROR: set NOAHPAC_REPORT_EMAIL env var to the recipient address", file=sys.stderr)
        return 2

    run_date = date.today().strftime('%B %d, %Y')
    print(f"{title} — {run_date}")
    print(f"  Report file : {report_file}")

    raw_results = load_results(report_file)
    print(f"  Entries found: {len(raw_results)}")

    results = merge_expected(raw_results, expected)

    changed  = [r for r in results if r['status'] == 'changed']
    problems = [r for r in results if r['status'] in ('error', 'missing')]

    prefix  = 'ACTION REQUIRED — ' if changed else ''
    subject = f"{prefix}{title} — {run_date}"
    if problems:
        subject += f" ({len(problems)} error{'s' if len(problems) != 1 else ''})"

    html_body = build_html(results, run_date, title, report_file)
    send_email(subject, html_body)

    print(f"  Email sent to {RECIPIENT}")
    print(f"  Subject: {subject}")

    try:
        report_file.unlink(missing_ok=True)
    except Exception as exc:
        print(f"  WARNING: could not remove report file: {exc}", file=sys.stderr)

    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
