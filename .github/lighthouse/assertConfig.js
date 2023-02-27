const defaultAssertionRules = {
  // This is annoying to fix and unnecessary to fix from what I gather
  // given the nature of this website
  'csp-xss': 'off',
  // This is caused by vercel's live feedback widget
  'uses-rel-preconnect': 'off',
  // Some of the images I use is cut off based off of css I apply to it like post banners
  'uses-responsive-images': 'off',
  // vercel's live feedback widget interferes with coverage metrics
  // can double check this with chrome's coverage tool
  'unused-javascript': 'off',
  // something about next.js or vercel makes the rss feed link prefetched which
  // for some reason 404's
  'errors-in-console': 'off'
}

const pathToOverrides = {
  'posts/.+': {
    // Code block non-highlighted line opacity seems to trip this up
    'color-contrast': 'off',
    // This is caused by gifs being really large
    // https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/
    'total-byte-weight': 'off',
    // This is caused by gifs being really large
    // https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/
    'efficient-animated-content': 'off',
    // Checkboxes seem to fail this, but they're there for style only
    // Github seems to style checkboxes in comments in the same way
    label: 'off'
  },
  about: {
    // This is caused by the hero being rendered even though it isn't seen on mobile
    // Not sure how to fix this one
    'offscreen-images': 'off'
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
