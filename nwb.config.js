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
    /*
    Chrome gives us support for language features that aren't in PhantomJS, like Object.fromEntries,
    ... but there are limitations on Travis (https://docs.travis-ci.com/user/chrome),
    so we run it headless + no-sandbox by default. Change to 'Chrome' for interactive debugging.
    */
    browsers: ['ChromeHeadlessNoSandbox'],
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
