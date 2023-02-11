# ryanclements.dev <!-- omit in toc -->

- [Setup](#setup)
- [Developing](#developing)
  - [Debugging in VSCode](#debugging-in-vscode)
- [Linting](#linting)
- [Testing](#testing)
  - [Lighthouse](#lighthouse)
- [Deployment](#deployment)
- [SEO](#seo)

## Setup

1. (Recommended) Use VSCode and install the recommended extensions
2. Run `yarn install` to install all of the dependencies
3. Create a `.env.production.local` file and put the following contents in it

   ```.env
   NEXT_PUBLIC_VERCEL_URL=ryanclements.dev
   ```

   - This is to get around how we [cannot get the public url of the site easily within Vercel](https://github.com/vercel/next.js/discussions/16429#discussioncomment-1302156)

## Developing

Run `yarn dev` to start a dev server

Run `yarn format <files>` to format the files given

Run `yarn format:all` to format all of the files

Run `yarn print-browser-support` to print out all the browsers this project is configured to support as specified in the `.browserslistrc`

You can use [feeder.co's Chrome extension RSS Feed Reader](https://chrome.google.com/webstore/detail/rss-feed-reader/pnjaodmkngahhkoihejjehlcdlnohgmp/related?hl=en) when testing the rss feed

Docs for rss can be found [here](https://www.w3schools.com/xml/xml_rss.asp)

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

## SEO

You can use Facebook's [OG debugger tool](https://developers.facebook.com/tools/debug/) to help debug card creation when sharing on Facebook. The docs for this can be found [here](https://developers.facebook.com/docs/sharing/webmasters/).

You can use Twitter's Tweet Composer to test link rendering. See [this post](https://twittercommunity.com/t/card-validator-preview-removal/175006) for more details and [this troubleshooting guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards) for help.
