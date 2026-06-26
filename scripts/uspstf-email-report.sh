#!/bin/bash
exec /usr/bin/python3 "$(dirname "$0")/quarterly-email-report.py" \
    --report-prefix uspstf-report \
    --title "USPSTF Screener Weekly Refresh" \
    --expected '[["uspstf","USPSTF Screener","https://noahpac.com/screener/"]]'
