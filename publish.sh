#!/usr/bin/env bash
set -o errexit

die() { set +v; echo "$*" 1>&2 ; exit 1; }

[ `git symbolic-ref --short HEAD` != 'master' ] || die 'Make a release branch!'
[[ `git status --porcelain` ]] && die 'Commit changes and push!'

npm version patch
npm publish --access=public
git push origin --tags
