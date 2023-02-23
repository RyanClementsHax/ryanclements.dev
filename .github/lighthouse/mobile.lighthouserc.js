// https://github.com/GoogleChrome/lighthouse-ci
module.exports = {
  ci: {
    // https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md#lighthouse-configuration
    collect: {
      // The default config is mobile
      // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/default-config.js
      // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/constants.js#L93
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: [
          'performance',
          'accessibility',
          'seo',
          'best-practices'
        ]
      }
    },
    assert: {
      // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
      preset: 'lighthouse:no-pwa'
    }
  }
}
