module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order',
    'stylelint-a11y/recommended'
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-strict-value'
  ],
  rules: {
    'selector-class-pattern': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'import-notation': null,
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
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
}
