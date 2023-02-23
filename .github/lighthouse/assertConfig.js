const defaultAssertionRules = {
  // 'csp-xss': 'off',
  'uses-rel-preconnect': 'off',
  'uses-responsive-images': 'off',
  'efficient-animated-content': 'off'
}

const pathToOverrides = {
  'posts/.+': {
    // Code block non-highlighted line opacity seems to trip this up
    'color-contrast': 'off',
    // Right now, the AST downloaded on a post is really large
    // I hope to fix this later with server components
    'total-byte-weight': 'off'
    // 'link-text': 'off'
  },
  about: {
    // 'offscreen-images': 'off'
  }
}

const catchAllAssertionMatcher = {
  matchingUrlPattern: `https://[^/]+/(?!${Object.keys(pathToOverrides).join(
    '|'
  )}).*`,
  // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
  preset: 'lighthouse:no-pwa',
  assertions: defaultAssertionRules
}

module.exports = {
  // https://github.com/GoogleChrome/lighthouse-ci/blob/d7240dcb25ff67aa74cce5067170a5f1a7a446a2/docs/configuration.md#assert
  assert: {
    assertMatrix: [
      catchAllAssertionMatcher,
      ...Object.entries(pathToOverrides).map(([key, value]) => ({
        matchingUrlPattern: key,
        preset: 'lighthouse:no-pwa',
        assertions: {
          ...defaultAssertionRules,
          ...value
        }
      }))
    ]
  }
}
