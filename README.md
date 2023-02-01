# ryanclements.dev <!-- omit in toc -->

- [Setup](#setup)
- [Developing](#developing)
  - [Debugging in VSCode](#debugging-in-vscode)
- [Linting](#linting)
- [Testing](#testing)
  - [Lighthouse](#lighthouse)
- [Deployment](#deployment)

## Setup

1. (Recommended) Use VSCode and install the recommended extensions
2. Run `yarn install` to install all of the dependencies
3. Create a `.env.production.local` file and put the following contents in it

   ```.env
   NEXT_PUBLIC_VERCEL_URL=ryanclements.dev
   ```

## Developing

Run `yarn dev` to start a dev server

Run `yarn format <files>` to format the files given

Run `yarn format:all` to format all of the files

Run `yarn print-browser-support` to print out all the browsers this project is configured to support as specified in the `.browserslistrc`

### Debugging in VSCode

See the [Next.js docs for how to do this](https://nextjs.org/docs/advanced-features/debugging#debugging-with-vs-code)

## Linting

Run `yarn lint:all` to lint all of the files

Run `yarn lint:js <files>` to lint the specified files via `eslint`

Run `yarn lint:js` to lint all of the js/jsx/ts/tsx files

Run `yarn lint:styles <files>` to lint the specified files fia `stylelint`

Run `yarn lint:styles:all` to lint all of the css/scss files

## Testing

Run `yarn test` to run the jest tests

Run `yarn type-check` to run type checking

Run `yarn test:all` to lint all files, type check, and run jest tests

### Lighthouse

It is recommended that you get [this](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related) extension to help run lighthouse tests

## Deployment

Deployment is handled by Vercel on merge to the `main` branch
