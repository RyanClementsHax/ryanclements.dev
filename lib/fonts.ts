import { Lato } from '@next/font/google'

const lato = Lato({
  weight: '900',
  subsets: ['latin'],
  /**
   * needs to be in sync with tailwind config
   * and storybook styles
   *  */
  variable: '--font-title'
})

export const fontClass = lato.variable
