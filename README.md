# prov-vis
Generic wrapper for [4dn-dcic/react-workflow-viz](https://github.com/4dn-dcic/react-workflow-viz):
- Takes [W3C PROV-JSON](https://www.w3.org/Submission/prov-json/) as input.
- Call-backs for defining node names and on-click details.
- [NPM package](https://www.npmjs.com/package/@hubmap/prov-vis) provides a React component, and a plain JS interface.

[Demo](https://hubmapconsortium.github.io/prov-vis/)

## Development

This repo is bootstrapped with [NWB](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md).

To use the development demo:
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
then visit `http://localhost:8080/`.

## Publish

Make a release branch, confirm that tests pass, and run:
```
./publish.sh
```
That will bump the version, create a tag, publish to NPM, and push to GitHub.
