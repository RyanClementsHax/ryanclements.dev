# ryanclements.dev

- [ryanclements.dev](#ryanclementsdev)
  - [Setup](#setup)
  - [Developing](#developing)
    - [Debugging in VSCode (may be broken beyond our control)](#debugging-in-vscode-may-be-broken-beyond-our-control)
  - [Linting](#linting)
  - [Testing](#testing)
    - [Lighthouse](#lighthouse)
  - [Deployment](#deployment)
  - [Checkly](#checkly)

## Setup

1. (Recommended) Use VSCode and install the recommended extensions
2. Run `yarn install` to install all of the dependencies
3. Setup the environment variables

   - copy create a `.env.local` file at the root of this repo
   - copy the template below into that file and replace the placeholders with actual values

     ```.env
     # set this if you plan to use chromatic
     CHROMATIC_PROJECT_TOKEN=<get this from chromatic>
     ```

## Developing

Run `yarn dev` to start a dev server

Run `yarn format <files>` to format the files given

Run `yarn format:all` to format all of the files

Run `yarn print-browser-support` to print out all the browsers this project is configured to support as specified in the `.browserslistrc`

### Debugging in VSCode (may be broken beyond our control)

Run the `Debug next` launch configuration to debug the next server

Run the `Debug chrome` launch configuration to debug the website in chrome ([MUST close all other chrome tabs first!!](https://stackoverflow.com/a/55505708))

- Make sure you have the `Debugger for Chrome` extension installed

Run the `Debug next and chrome` launch configuration to launch both ([MUST close all other chrome tabs first!!](https://stackoverflow.com/a/55505708))

## Linting

- Run `yarn lint:all` to lint all of the files

Run `yarn lint:js <files>` to lint the specified files via `eslint`

Run `yarn lint:js:all` to lint all of the js/jsx/ts/tsx files

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

## Checkly
