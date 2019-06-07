#!/bin/sh
sed -e 's|__url__|'$LGTM_URL'|g' ./popup.template.js > popup.js