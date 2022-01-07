/* eslint-disable @typescript-eslint/no-explicit-any */

// tailwind doesn't have type definitions so we need to create them on our own until types are added

declare module 'tailwindcss/colors' {
  declare const colors: any
  export = colors
}
