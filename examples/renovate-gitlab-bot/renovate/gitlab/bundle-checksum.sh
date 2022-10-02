#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# Function to print to stderr, for easier debugging
function echo_err() { echo "$@" 1>&2; }

PWD=$(pwd)
echo_err "Current working dir: $PWD"

# Check whether we need to execute
if [ ! -f "Gemfile.checksum" ]; then
  echo_err "Gemfile.checksum does not exist; skipping regeneration"

  # Exit early
  exit 0
fi

VENDOR_DIR="./vendor/gems/bundler-checksum"

# If bundler-checksum is vendored within the current project, we run it directly
if [ -d "$VENDOR_DIR" ]; then
  echo_err "$VENDOR_DIR exists"

  ruby -I "$VENDOR_DIR/lib" "$VENDOR_DIR/bin/bundler-checksum" init 1>&2

  # Exit
  exit 0
fi

echo_err "No vendored bundler-checksum found, installing from rubygems"

# We install bundler-checksum into a temp directory
BIN_DIR="/tmp/_bin"
mkdir -p "$BIN_DIR"

# If multiple gems are updated, we just need to install it once
if [ -f "$BIN_DIR/bundler-checksum" ]; then
  echo_err "bundler-checksum already installed"
else
  echo_err "Installing bundler-checksum"
  # Actually installing the gem
  gem install bundler-checksum --no-document --bindir "$BIN_DIR" 1>&2
fi

# Regenerate the checksum file
"$BIN_DIR/bundler-checksum" init 1>&2

exit 0
