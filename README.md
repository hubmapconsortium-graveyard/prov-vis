# prov-vis
HuBMAP-specific wrapper for [4dn-dcic/react-workflow-viz](https://github.com/4dn-dcic/react-workflow-viz)

[Static demo](https://hubmapconsortium.github.io/prov-vis/)

## Development

This repo is bootstrapped with [NWB](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md).

To use the live demo:
```sh
npm install
npm start
```
and then visit `http://localhost:3000/`.

To preview the static demo:
```sh
npm run build
http-server
```
and change the `script` tag in `index.html` to point at the UMD build;
then visit `http://localhost:8080/`.

(Both demos use the default export from `tests/fixtures.js` as their input:
Tweak that to see how different structures are rendered.)

## Publish

Make a release branch, and run:
```
./test.sh
./publish.sh
```
That will run the tests, bump the version, publish to NPM, and push to GitHub.
