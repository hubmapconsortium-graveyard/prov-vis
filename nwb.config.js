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
  karma: {
    browsers: ['Chrome']
    // Chrome gives us visual debugging, and support for language features that aren't in PhantomJS.
    // for example: Object.fromEntries
  }
}
