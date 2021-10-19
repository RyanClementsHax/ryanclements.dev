import { resolveThemeExtensionsAsTailwindExtension } from './themeUtils'

describe('themeUtils', () => {
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
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                colors: (theme: (key: string) => unknown) => ({
                  primary: theme('some.key')
                })
              }
            }
          ])
        ).toEqual({
          colors: expect.func(fn =>
            expect(fn(jest.fn(x => x))).toEqual({
              primary: 'var(--colors-primary)'
            })
          )
        })
      })
    })

    describe('when given multiple themes', () => {
      it('resolves top level values as custom props', () => {
        expect(
          resolveThemeExtensionsAsTailwindExtension([
            {
              name: 'first',
              extend: {
                top1: 'level'
              }
            },
            {
              name: 'second',
              extend: {
                top2: 'level'
              }
            }
          ])
        ).toEqual({
          top1: 'var(--top1)',
          top2: 'var(--top2)'
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
            },
            {
              name: 'second',
              extend: {
                colors: {
                  secondary: 'second'
                },
                woah: {
                  bar: {
                    bing: 'bazz'
                  }
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
              bing: 'var(--foo-bar-bing)'
            }
          },
          woah: {
            bar: {
              bing: 'var(--woah-bar-bing)'
            }
          }
        })
      })
    })
  })
})
