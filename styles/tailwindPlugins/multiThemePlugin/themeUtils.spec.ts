import { resolveThemeExtensionsAsTailwindExtension } from './themeUtils'
import { TailwindExtension, ExtensionValue, Theme, ThemeCb } from 'tailwindcss'

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

  const resolveOpacityCallbacks = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    themeExtensionValue: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any => {
    if (
      typeof themeExtensionValue === 'string' ||
      typeof themeExtensionValue === 'number' ||
      typeof themeExtensionValue === 'undefined' ||
      Array.isArray(themeExtensionValue)
    ) {
      return themeExtensionValue
    }
    if (typeof themeExtensionValue === 'function') {
      return themeExtensionValue(opacityConfig)
    }
    return Object.entries(themeExtensionValue).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: resolveOpacityCallbacks(value)
      }),
      {}
    )
  }

  const resolveCallbacks = (
    extension: TailwindExtension
  ): TailwindExtension => {
    const extensionWithResolvedThemeCbs = Object.entries(extension).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          typeof value === 'function'
            ? (value as ThemeCb<ExtensionValue>)(theme)
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

    describe('callbacks', () => {
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

      it('resolves conflicting callbacks', () => {
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
                  colors: theme => ({
                    secondary: theme('some.different.key')
                  })
                }
              }
            ])
          )
        ).toEqual({
          colors: {
            primary: 'var(--colors-primary)',
            secondary: 'var(--colors-secondary)'
          }
        })
      })

      it('throws if it finds a callback not on the top level', () => {
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

      it('resolves color properties with opacity', () => {
        expect(
          resolveCallbacks(
            resolveThemeExtensionsAsTailwindExtension([
              {
                name: 'first',
                extend: {
                  colors: {
                    primary: '#ff0'
                  }
                }
              },
              {
                name: 'second',
                extend: {
                  colors: {
                    secondary: '#0ff'
                  }
                }
              }
            ])
          )
        ).toEqual({
          colors: {
            primary: 'rgba(var(--colors-primary), opacityValue)',
            secondary: 'rgba(var(--colors-secondary), opacityValue)'
          }
        })
      })
    })

    it('resolves non conflicting arrays', () => {
      expect(
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

    it('ignores null values', () => {
      expect(
        resolveThemeExtensionsAsTailwindExtension([
          {
            name: 'first',
            extend: {
              colors: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                primary: null
              }
            }
          },
          {
            name: 'second',
            extend: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              foo: {
                secondary: null
              }
            }
          }
        ])
      ).toEqual({
        colors: {
          primary: null
        },
        foo: {
          secondary: null
        }
      })
    })

    it('ignores undefined values', () => {
      expect(
        resolveThemeExtensionsAsTailwindExtension([
          {
            name: 'first',
            extend: {
              colors: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                secondary: undefined
              }
            }
          },
          {
            name: 'second',
            extend: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              foo: {
                secondary: undefined
              }
            }
          }
        ])
      ).toEqual({
        colors: {
          secondary: undefined
        },
        foo: {
          secondary: undefined
        }
      })
    })
  })
})
