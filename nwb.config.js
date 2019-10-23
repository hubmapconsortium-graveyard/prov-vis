module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'hubmapProvVis',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    env: {
      targets: {
        node: 'current'
        // WebComponents require native ES class syntax,
        // so we need to tell Babel to *not* transpile classes.
        // NOTE: Not sure if this is the best setting for cross browser compatibility.
      }
    }
  }
}
