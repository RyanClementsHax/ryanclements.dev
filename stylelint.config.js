module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order',
    'stylelint-a11y/recommended',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier/recommended'
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-strict-value'
  ],
  rules: {
    'declaration-block-trailing-semicolon': null,
    'selector-class-pattern': null,
    'a11y/media-prefers-reduced-motion': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'scale-unlimited/declaration-strict-value': [
      ['/color$/'],
      {
        disableFix: true,
        ignoreKeywords: ['initial']
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer'
        ]
      }
    ]
  }
}
