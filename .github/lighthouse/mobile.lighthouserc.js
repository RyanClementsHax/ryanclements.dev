// https://github.com/GoogleChrome/lighthouse-ci

const defaultAssertionRules = {
  'csp-xss': 'off',
  'uses-rel-preconnect': 'off',
  'uses-responsive-images': 'off',
  'efficient-animated-content': 'off'
}

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
      assertMatrix: [
        {
          matchingUrlPattern: 'https://[^/]+/(?!posts/.+).*',
          // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
          preset: 'lighthouse:no-pwa',
          assertions: defaultAssertionRules
        },
        {
          matchingUrlPattern: 'posts/.+',
          // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
          preset: 'lighthouse:no-pwa',
          assertions: {
            ...defaultAssertionRules,
            // Code block non-highlighted line opacity seems to trip this up
            'color-contrast': 'off',
            // Right now, the AST downloaded on a post is really large
            // I hope to fix this later with server components
            'total-byte-weight': 'off',
            'link-text': 'off'
          }
        },
        {
          matchingUrlPattern: '/about',
          // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
          preset: 'lighthouse:no-pwa',
          assertions: {
            ...defaultAssertionRules,
            'offscreen-images': 'off'
          }
        }
      ]
    }
  }
}
