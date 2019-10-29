#!/usr/bin/env bash
set -o errexit

start() { echo travis_fold':'start:$1; echo $1; }
end() { echo travis_fold':'end:$1; }
die() { set +v; echo "$*" 1>&2 ; sleep 1; exit 1; }
# Race condition truncates logs on Travis: "sleep" might help.
# https://github.com/travis-ci/travis-ci/issues/6018

start eslint
eslint src tests
end eslint

start test
npm run test
end test

start changelog
diff CHANGELOG.md <(curl https://raw.githubusercontent.com/hubmapconsortium/prov-vis/master/CHANGELOG.md) \
  && die 'Update CHANGELOG.md'
end changelog
