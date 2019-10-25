# prov-vis
HuBMAP-specific wrapper for [4dn-dcic/react-workflow-viz](https://github.com/4dn-dcic/react-workflow-viz)

## Development

This repo is bootstrapped with [NWB](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md).

To use the live development server:
```
npm start
```
and then visit `http://localhost:3000/`.

To demo the UMD package, first build, then start a static file server:
```
npm run build
npm install http-server -g
http-server
```
and then visit `http://localhost:8080/umd-demo.html`.
