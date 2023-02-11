import { Lato } from '@next/font/google'

const lato = Lato({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-title' // needs to be in sync with tailwind config
})

export const fontClass = lato.variable
