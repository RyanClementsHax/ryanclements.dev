import { resolveThemeExtensionsAsTailwindExtension } from './themeUtils'
import { TailwindExtension, Theme } from 'tailwindcss'

describe('themeUtils', () => {
  let theme: Theme

  beforeEach(() => {
    theme = jest.fn(x => x)
  })

  const resolveCallbacks = (extension: TailwindExtension): TailwindExtension =>
    Object.entries(extension).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === 'function' ? value(theme) : value
      }),
      {}
    )

  describe('resolveThemeExtensionsAsTailwindExtension', () => {
    it('resolves an empty themes array as an empty config', () => {
      expect(resolveThemeExtensionsAsTailwindExtension([])).toEqual({})
    })

    describe('when given one theme', () => {
      it('resolves top level values as custom props', () => {
        expect(
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                top: 'level'
              }
            }
          ])
        ).toEqual({
          top: 'var(--top)'
        })
      })

      it('resolves nested values as custom props', () => {
        expect(
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                colors: {
                  primary: 'first'
                },
                foo: {
                  bar: {
                    bing: 'bazz'
                  }
                }
              }
            }
          ])
        ).toEqual({
          colors: {
            primary: 'var(--colors-primary)'
          },
          foo: {
            bar: {
              bing: 'var(--foo-bar-bing)'
            }
          }
        })
      })

      it('resolves callbacks', () => {
        expect(
          resolveCallbacks(
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  colors: theme => ({
                    primary: theme('some.key')
                  })
                }
              }
            ])
          )
        ).toEqual({
          colors: {
            primary: 'var(--colors-primary)'
          }
        })
      })
    })

    describe('when given multiple themes', () => {
      it('resolves and merges top level values as custom props', () => {
        expect(
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                top1: 'level',
                same: 'prop'
              }
            },
            {
              name: 'second',
              extend: {
                top2: 'level',
                same: 'prop'
              }
            },
            {
              name: 'third',
              extend: {
                top3: 'level',
                same: 'prop'
              }
            }
          ])
        ).toEqual({
          top1: 'var(--top1)',
          top2: 'var(--top2)',
          top3: 'var(--top3)',
          same: 'var(--same)'
        })
      })

      it('resolves and merges nested as custom props', () => {
        expect(
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                colors: {
                  primary: 'first'
                },
                foo: {
                  bar: {
                    bing: 'bazz'
                  }
                }
              }
            },
            {
              name: 'second',
              extend: {
                colors: {
                  secondary: 'second'
                },
                foo: {
                  bar: {
                    different: 'bazz'
                  },
                  thing: 'value1'
                }
              }
            },
            {
              name: 'third',
              extend: {
                colors: {
                  secondary: 'third'
                },
                veryDifferent: {
                  bar: {
                    different: 'bazz'
                  },
                  thing: 'value2'
                }
              }
            }
          ])
        ).toEqual({
          colors: {
            primary: 'var(--colors-primary)',
            secondary: 'var(--colors-secondary)'
          },
          foo: {
            bar: {
              bing: 'var(--foo-bar-bing)',
              different: 'var(--foo-bar-different)'
            },
            thing: 'var(--foo-thing)'
          },
          veryDifferent: {
            bar: {
              different: 'var(--very-different-bar-different)'
            },
            thing: 'var(--very-different-thing)'
          }
        })
      })

      it('resolves non conflicting callbacks', () => {
        expect(
          resolveCallbacks(
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  colors: theme => ({
                    primary: theme('some.key')
                  })
                }
              },
              {
                name: 'second',
                extend: {
                  somethingElse: theme => ({
                    foo: theme('some.different.key')
                  })
                }
              }
            ])
          )
        ).toEqual({
          colors: {
            primary: 'var(--colors-primary)'
          },
          somethingElse: {
            foo: 'var(--something-else-foo)'
          }
        })
      })
    })
  })
})
