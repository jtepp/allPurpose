#!/usr/bin/env bash

find src/pages -type f -name '*.jsx' -print0 | while IFS= read -r -d '' file; do
  echo "Processing file: $file"
  dir=$(dirname "$file")
  base=$(basename "$file" .jsx)
  mkdir -p "$dir/$base"
  mv "$file" "$dir/$base/$base.jsx"
done