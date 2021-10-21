import { resolveThemeExtensionsAsTailwindExtension } from './themeUtils'
import {
  TailwindExtension,
  TailwindValue,
  Theme,
  ThemeCb,
  ColorConfig,
  ColorValue,
  OpacityCb,
  WithThemeCb
} from 'tailwindcss'

describe('themeUtils', () => {
  let theme: Theme
  let opacityConfig: { opacityVariable: string; opacityValue: string }

  beforeEach(() => {
    theme = jest.fn(x => x)
    opacityConfig = {
      opacityValue: 'opacityValue',
      opacityVariable: '--opacity-variable'
    }
  })

  const resolveOpacityCallbacks = <
    T extends WithThemeCb<ColorConfig> | ColorValue
  >(
    themeExtensionValue: T
  ): T extends WithThemeCb<ColorConfig>
    ? WithThemeCb<ColorConfig>
    : ColorValue => {
    if (
      typeof themeExtensionValue === 'string' ||
      typeof themeExtensionValue === 'number' ||
      typeof themeExtensionValue === 'undefined' ||
      Array.isArray(themeExtensionValue)
    ) {
      return themeExtensionValue as T extends WithThemeCb<ColorConfig>
        ? WithThemeCb<ColorConfig>
        : ColorValue
    }
    if (typeof themeExtensionValue === 'function') {
      return (themeExtensionValue as OpacityCb)(
        opacityConfig
      ) as T extends WithThemeCb<ColorConfig>
        ? WithThemeCb<ColorConfig>
        : ColorValue
    }
    return Object.entries(themeExtensionValue).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: resolveOpacityCallbacks(value)
      }),
      {}
    ) as T extends WithThemeCb<ColorConfig>
      ? WithThemeCb<ColorConfig>
      : ColorValue
  }

  const resolveCallbacks = (
    extension: TailwindExtension
  ): TailwindExtension => {
    const extensionWithResolvedThemeCbs = Object.entries(extension).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          typeof value === 'function'
            ? (value as ThemeCb<TailwindValue>)(theme)
            : value
      }),
      {}
    ) as TailwindExtension

    if (extensionWithResolvedThemeCbs.colors) {
      extensionWithResolvedThemeCbs.colors = resolveOpacityCallbacks(
        extensionWithResolvedThemeCbs.colors
      )
    }
    return extensionWithResolvedThemeCbs
  }

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

      describe('callbacks', () => {
        it('resolves theme callbacks', () => {
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

        it('throws if it finds a callback not on the top level that is not within the color config', () => {
          expect(() =>
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  foo: {
                    bar: (theme: Theme) => ({
                      primary: theme('some.key')
                    })
                  }
                }
              }
            ])
          ).toThrow()
        })
      })

      it('resolves arrays', () => {
        expect(
          resolveCallbacks(
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  myArray: [
                    {
                      thing: 1
                    },
                    {
                      thing: 2
                    }
                  ]
                }
              }
            ])
          )
        ).toEqual({
          myArray: [
            {
              thing: 'var(--my-array-0-thing)'
            },
            {
              thing: 'var(--my-array-1-thing)'
            }
          ]
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

      it('resolves non conflicting arrays', () => {
        expect(
          resolveCallbacks(
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  myArray1: [
                    {
                      thing: 1
                    },
                    {
                      thing: 2
                    }
                  ]
                }
              },
              {
                name: 'second',
                extend: {
                  myArray2: [
                    {
                      thing: 1
                    },
                    {
                      thing: 2
                    }
                  ]
                }
              }
            ])
          )
        ).toEqual({
          myArray1: [
            {
              thing: 'var(--my-array1-0-thing)'
            },
            {
              thing: 'var(--my-array1-1-thing)'
            }
          ],
          myArray2: [
            {
              thing: 'var(--my-array2-0-thing)'
            },
            {
              thing: 'var(--my-array2-1-thing)'
            }
          ]
        })
      })

      it('throws if it finds a callback not on the top level that is not within the color config', () => {
        expect(() =>
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                foo: {
                  bar: {
                    primary: 'orange'
                  }
                }
              }
            },
            {
              name: 'second',
              extend: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                foo: {
                  bar: (theme: Theme) => ({
                    primary: theme('some.key')
                  })
                }
              }
            }
          ])
        ).toThrow()
      })
    })
  })
})
