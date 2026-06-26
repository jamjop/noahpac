#!/bin/bash
exec /usr/bin/python3 "$(dirname "$0")/quarterly-email-report.py" \
    --report-prefix antibiogram-report \
    --title "ND Antibiogram Monthly Update" \
    --expected '[["antibiogram","ND Antibiogram","https://noahpac.com/antibiogram/"]]'
