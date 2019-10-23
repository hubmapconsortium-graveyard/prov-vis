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
  }
}
