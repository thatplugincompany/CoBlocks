#!/usr/bin/env bash

# Merge coblocks.pot changes into the appropriate .po for each locale in package.json
LOCALES=$(cat package.json | jq -r '.locales')
POTPATH='languages';

while IFS="=" read -r KEY value
do
	msgmerge -vU --backup=none "${POTPATH}/coblocks-${KEY}.po" "${POTPATH}/coblocks.pot"
done < <(echo $LOCALES | jq -r "to_entries|map(\"\(.key)=\(.value)\")|.[]")
