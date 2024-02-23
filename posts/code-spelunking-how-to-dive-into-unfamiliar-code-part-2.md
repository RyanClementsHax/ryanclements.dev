---
bannerAlt: man in cave by @wandercreative on Unsplash
publishedOn: 2024-02-23T05:00:00.000Z
description: Reading other people's code is hard. Here is how I do it.
title: 'Code spelunking: How to dive into unfamiliar code (part 2)'
---

Diving into code you didn't write is hard. I wrote about it some in [the first post on this topic](https://ryanclements.dev/posts/code-spelunking-how-to-dive-into-unfamiliar-code-part-1). Now I'll share another insight. In this post, I'll speak specifically about build systems.

Making sense of a codebase in part requires you to figure out how different files and modules relate to each other. Build systems are the tools that define the rules of these relationships. If you understand how build systems work, you are in a much better position to understand a code base.

## Build systems define relationships

Let's take css imports as an example. The following isn't valid JavaScript, but is used ubiquitously, even in the [default app created by create-react-app](https://github.com/facebook/create-react-app/blob/0a827f69ab0d2ee3871ba9b71350031d8a81b7ae/packages/cra-template-typescript/template/src/App.tsx#L3).

```js
import 'App.css'
```

If you run this in the browser, you get the following error.

```text
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/css". Strict MIME type checking is enforced for module scripts per HTML spec.
```

What actually happens under the hood, is something like [style-loader](https://www.npmjs.com/package/style-loader) removes the import entirely and injects the css in a `<style>{:html}` tag in the document's `<head>{:html}`.

[Webpack's module loading system is can be complex](https://webpack.js.org/concepts/loaders/). That being said, knowing that files are actually loaded or could be loaded by a separate entitiy gives you insight into how any two files are related or even if they're related.

It can also tell you where to look. If you're debugging how, why, or what css gets injected on certain pages, you now know that you can check config files, style output, path aliasing, etc.

Another example, speaking of aliases, is if you have aliases configured in your codebase e.g. `@/lib/utils`. In most JavaScript/TypeScript projects these days, this is configured in the [tsconfig.json's paths property](https://www.typescriptlang.org/tsconfig#paths). Knowing that build systems are used to define these aliases helps you find the right files to look for and the relationships between them.

My favorite example is how, by understanding webpack, you can easily understand how [my post markdown files get rendered in storybook](https://ryanclements.dev/posts/seamlessly-using-nextjs-static-props-in-storybook). You'll know that markdown files can't be directly imported, so you'll look for [something that hooks into the Storybook's build process](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/.storybook/main.js#L15). After figuring out that I'm using webpack, you'll then need to find something that [looks like a loader that handles markdown](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/.storybook/loaders/postLoader.ts) and [configuration to hook up that loader](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/.storybook/main.js#L18).

## Build systems create the code that actually gets run

How does a modern server rendered app render a web page? It does this, roughtly, in a few steps.

1. A request is received.
2. That request is resolved to a page
3. The server renders that page
4. The resulting html is sent to the browser
5. The html loads in JavaScript to provide client interactivity if any

New engineers might be surprised that in many frameworks, there are two completely different sets of code that execute, a bundle for the server and a bundle for the client.

Knowing how source code is transformed from developer friendly files to environment friendly server and client bundles makes it easier to understand what something like [useIsomorphicLayoutEffect](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect) is attempting to achieve.

Another great example is found in Rust projects. Why would there be more than one function definitions of the same function in the same file like this? Shouldn't there be a compilation error?

Here is [one example from Deno](https://github.com/denoland/deno/blob/bcf2156dbfac42d7bc9b0f6cb759a97d27b43a78/ext/webgpu/byow.rs#L54).

```rust
#[cfg(target_os = "macos")]
fn raw_window(
  system: &str,
  ns_window: *const c_void,
  ns_view: *const c_void,
) -> Result<RawHandles, AnyError> {
  // ...
}

#[cfg(target_os = "windows")]
fn raw_window(
  system: &str,
  window: *const c_void,
  hinstance: *const c_void,
) -> Result<RawHandles, AnyError> {
  // ...
}

#[cfg(target_os = "linux")]
fn raw_window(
  system: &str,
  window: *const c_void,
  display: *const c_void,
) -> Result<RawHandles, AnyError> {
  // ...
}
```

This makes sense if you know that build systems, especially [Cargo](https://doc.rust-lang.org/cargo/), Rust's default build system, frequently use conditional compilation, or including code in the final output based on some condition.

The [cfg attribute](https://doc.rust-lang.org/rust-by-example/attribute/cfg.html) is used to conditionally compile code for different platform. In the example above, the first function runs on mac, the second on windows, and the third on linux.

## Build systems ingest dependencies

The large majority of modern applications take dependencies on _something_. Build systems are the glue between application and those dependencies.

With this in mind, you can determine things like:

- What dependencies are being used?
- What versions are being used?
- How are those dependencies used?
- Where are those dependencies hosted?
- Do those dependencies bring in more dependencies?

Let's take a recent exploration I had with [Nuxt](https://nuxt.com/) as an example for why this is useful.

I'm attempting to solve a [bug related to Nuxt's prerendering feature](https://github.com/nuxt/nuxt/issues/25594). I can tell [Nuxt uses nitropack](https://github.com/nuxt/nuxt/blob/ec5d254f417d04e92acd0a716c662637e178f6a6/packages/nuxt/package.json#L92), a wrapper around [Nitro](https://nitro.unjs.io/), the server Nuxt uses. I know this because Node.js applications declare their dependencies in their `package.json` and build systems use this to pull in those depenencies. No other dependency looked related to prerendering.

Knowing that [nuxt imports its `prerender` function](https://github.com/nuxt/nuxt/blob/ec5d254f417d04e92acd0a716c662637e178f6a6/packages/nuxt/src/core/nitro.ts#L7) (found that through good 'ole `ctrl + shift + F`), I set a couple of log statements around [this line](https://github.com/nuxt/nuxt/blob/ec5d254f417d04e92acd0a716c662637e178f6a6/packages/nuxt/src/core/nitro.ts#L501) within the downloaded code in `node_modules`. I knew that because I know that's where build systems pull dependency code from when constructing the final application. Those logs quickly showed that this line was in fact responsible for prerendering and it was being passed bad config.

## Conclusion

I've shown that a little knowledge of how build systems work goes a long way when attempting to understand unfamiliar code. It gives you a sense of orientation, hints at how code is related, and how dependencies are used.

Next time, I'll put together miscellaneous tips for code spelunking. In the meantime, happy spelunking!
