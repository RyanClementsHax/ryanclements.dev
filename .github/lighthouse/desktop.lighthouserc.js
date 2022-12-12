// https://github.com/GoogleChrome/lighthouse-ci
module.exports = {
  ci: {
    // https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md#lighthouse-configuration
    // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/desktop-config.js#L10
    collect: {
      // The default config is mobile
      // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/default-config.js
      // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/constants.js#L93
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/constants.js#L42
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0, // 0 means unset
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/constants.js#L70
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false
        },
        // https://github.com/GoogleChrome/lighthouse/blob/03674e9b100f769367e4f174ba7ca29a5b081912/core/config/constants.js#L85
        emulatedUserAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse',
        onlyCategories: [
          'performance',
          'accessibility',
          'seo',
          'best-practices'
        ]
      }
    }
  }
}
