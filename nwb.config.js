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
    // Chrome gives us visual debugging, and support for language features
    // that aren't in PhantomJS, like Object.fromEntries.
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
    // ... but there are limitations on Travis. https://docs.travis-ci.com/user/chrome
    extra: {
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      }
    }
  }
}
