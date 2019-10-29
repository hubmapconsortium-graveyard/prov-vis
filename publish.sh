#!/usr/bin/env bash
set -o errexit

die() { set +v; echo "$*" 1>&2 ; exit 1; }

[ `git symbolic-ref --short HEAD` != 'master' ] || die 'Make a release branch!'
git status && die 'Commit changes and push!'

./test.sh || die 'Fix tests!'

npm version patch
npm publish
git push origin --tags
