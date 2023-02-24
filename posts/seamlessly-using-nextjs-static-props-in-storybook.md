---
bannerAlt: construction vehicle by @zacedmo on Unsplash
publishedOn: 2023-02-20T05:00:00.000Z
description: >-
  How to use Next.js static props in Storybook using static imports, esbuild,
  and webpack
title: Seamlessly using Next.js static props in Storybook
updatedAt: 2023-02-24T14:41:13.498Z
---

Making this website has been one of the most fun side projects I've ever worked on. It's a playground where I can try so many things and have the freedom to create whatever my heart desires. In the spirit of using really cool tech, I decided to build this website with Next.js as my framework, and Storybook for component driven development, and UI testing.

One thing that immediately stood out when trying to get Next.js features to work in Storybook was that there wasn't great support. This was a common cry in the community to the point that I made [storybook-addon-next](https://www.npmjs.com/package/storybook-addon-next).

This worked great for features like `next/image` and CSS modules, but it couldn't do everything I needed for this website...

## Background

Next.js lets you prerender pages using Static Site Generation. This is a nice feature to make your website super fast by generating the given page(s) at build time instead of at run time. The way it works is that at build time, Next.js will call the page's `getStaticProps` function for each page that has one. It then passes the props that the function returns to the page component defined in the same file.

```tsx title=pages/GreetingPage.tsx
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

export const getStaticProps: GetStaticProps<{ greeting: string }> = async ({
  params
}) => {
  return {
    props: {
      greeting: 'Hello, world!'
    }
  }
}

const GreetingPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return <div>{props.greeting}</div>
}

export default GreetingPage
```

What Storybook does is you can render small components in isolation without neededing any server in these things called "stories". To render a story is give it a component, some props, and a few other configurations, and it will render that in the browser. This is great as it lets you develop components separately from each other and render them in as many configurations as you want to without having to manually rig your application to trigger special code paths. You can even visually regression test them with a tool like [Chromatic](https://www.chromatic.com/).

Not only can you render small components, but also larger ones too! You're not bound by the size or complexity of what you render so long as you follow Storybook's contract. This is great for building this website because I not only want to render small components like my header, but I also want to render full pages so see how all the small components fit together.

Getting Next.js pages rendered in Storybook, though, comes with some complications. Storybook has no concept of a server, static generation, or "pages" as understood by Next.js, so if you want to render a Next.js page as a story you can't hand Storybook a Next.js page and expect it to call the `getStaticProps` function, pass the returned props to the page component, and have it render the full page in the browser. The best you can do is extract the page into a component and manually pass in parameters when configuring the story.

```tsx title=pages/GreetingPage.tsx {2, 17}
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Greeting } from 'components/Greeting'

export const getStaticProps: GetStaticProps<{ greeting: string }> = async ({
  params
}) => {
  return {
    props: {
      greeting: 'Hello, world!'
    }
  }
}

const GreetingPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return <Greeting greeting={props.greeting} />
}

export default GreetingPage
```

```tsx title=components/Greeting.tsx
export interface GreetingProps {
  greeting: string
}

export const Greeting: React.FC<GreetingProps> = props => (
  <div>{props.greeting}</div>
)
```

```tsx title=components/Greeting.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import { Greeting, GreetingProps } from './Greeting'

export const Base: StoryFn<GreetingProps> = props => <Greeting {...props} />
Base.args = {
  greeting: 'Hello, world!'
}

export default {
  component: Greeting
} as Meta
```

## Problem

The aforementioned pattern is fine if your props are simple and static like maybe a user profile for a user profile page or a list of products for a product listing page. My `pages/posts/[slug].tsx` page, the page reponsible for rendering a given post (i.e. the one you're currently on), is not like this. Its props are much more complex.

When a post page is prerendered, the `getStaticProps` page will run grabbing the post to render from the `posts` directory of the repo. It then transforms the post, written in markdown, to html with a few transformations. The resulting props that get passed to the page component are complicated.

This is a small exerpt of the props that my page takes in.

```json
{
  "post": {
    "meta": {
      /* some post meta data like title, description, etc */
    },
    "content": {
      "type": "root",
      "children": [
        {
          "type": "element",
          "tagName": "p",
          "properties": {},
          "children": [
            {
              "type": "text",
              "value": "...",
              "position": {
                "start": {
                  "line": 7,
                  "column": 1,
                  "offset": 252
                },
                "end": {
                  "line": 7,
                  "column": 358,
                  "offset": 609
                }
              }
            }
            // and on and on and on
            // thousands of additional nodes ommitted for brevity
            // ...
          ],
          "position": {
            "start": {
              "line": 7,
              "column": 1,
              "offset": 252
            },
            "end": {
              "line": 7,
              "column": 358,
              "offset": 609
            }
          }
        }
      ]
    }
  }
}
```

The page takes in one prop `post` which consists of two things, meta data for the post (e.g. data published, title, etc) and the post content represented as an HTML Abstract Syntax Tree (AST). What an AST is is a topic for another time, but the problem is that the AST is massive. It has been truncated here, but the full json when formatted is thousands of lines long. I'd really like to create stories for the posts I write, but the props being so massive makes writing a story for it very unergonomic for several reasons.

1. **The json is very massive**. Inlining it into the story isn't practical. It would have to live in a separate file which makes it hard to tell with which props the story is being rendered with.
2. **Editing is a pain**. What if you wanted to edit it? You would have to manually edit the AST which is error prone and annoying. This is prohibitively complicated when trying to edit the code sections of the AST.
3. **What if the transformation pipeline changes?** If I change the pipeline that gets posts written in markdown to a post represented as html which results in a new AST structure, how will I update this story? I would have to standup the Next.js dev server, hit the page for the post I want to grab the props for, either log those props to a terminal so I can copy it from there or copy it directly from the page source (`ctrl + u`), and finally copy that back into wherever I'm keeping the json for that story. This is much more work than I care to do.
4. **Reviewing changes is difficult**. If I make changes to the AST to make the story render something different, the diff wouldn't be easily reviewable in a pull request since you are seeing changes to the AST and not the direct content itself. In other words, how would I know that I made the right changes if just looking at the pull request? I'd have to open up the story to find out. Visual regression tools like Chromatic make this more of a moot point, but I'd still at least like to understand the diff when I'm generating one.

There are many things that I could render in a blog post like images, code blocks, callouts, quotes, and headings. Since the html for these comes from that AST and not individual react components, I can't exactly make stories for each of these individually without breaking the AST up multiplying the problems listed above. The real value for me though is seeing them used in an actual post, in context.

Given the difficulties, I saw the following options.

1. Bite the bullet and accept the difficulties for the sake of being able to render a full blog post in a story
2. Give up and move on
3. Find a way to run the `getStaticProps` function when rendering a story

I so badly wanted option `3` to be viable, but stories render in a browser, therefore, you don't have access to any apis exclusive to the server side like reading the file system, which the blog post page needs to grab the post markdown file.

## The Idea

What if I ......imported...... the props into the story? Like this.

```tsx title=components/PostDetails.stories.tsx {3-5, 12}
import { Meta, StoryFn } from '@storybook/react'
import { PostDetails, PostDetailsProps } from './PostDetails'
// What's imported is the content of the .md file converted as props
// for the component below
import post from 'posts/the-post-i-want-to-put-in-a-story.md'

export const Base: StoryFn<PostDetailsProps> = props => (
  <PostDetails {...props} />
)

Template.args = {
  post
}

export default {
  component: PostDetails
} as Meta
```

See, when I worked on [storybook-addon-next](https://www.npmjs.com/package/storybook-addon-next), I worked a lot with webpack loaders and build tools of the like. I became familiar with how a file specified for importing can go through many transformations before actually being imported. What if I made a markdown loader that just took the raw `.md` file, and ran it through the pipeline I created?

It has the following benefits.

1. I don't need to worry about creating/editing clunky AST objects
2. The story will always be up to date with whatever changes I make to the pipeline
3. If I want to change the story, I change the markdown file so editing is pleasant
4. The only diffs created when content is edited is the diff of the pipeline or the markdown files themselves so reviewing is easy
5. I have all the access to server side APIs that I need because webpack loaders run in a server context and all that gets sent to the browser is the processed file (i.e. the same props that are returned from `getServerSideProps`)
6. It actually exercises the full post rendering pipeline so it gives my stories higher fidelity to what will be rendered in Next.js

It comes with the downside that I have to create a webpack loader which requires me to set up a separate build process if I want to use typescript and esm. More on this later.

Motivated by how cool it would be if I could pull this off, I went to work.

## The Loader

Webpack loaders are functions that tell webpack _how_ to load content when something asks for it.

<aside>

Definitely check out [the documentation](https://webpack.js.org/loaders/) and [Swashbucking with Code's Webpack 5 tutorial playlist](https://www.youtube.com/playlist?list=PLmZPx_9ZF_sB4orswXdpThGMX9ii2uP7Z) to learn more.

</aside>

Using Storybook's [custom webpack config feature](https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config), what I'm planning on doing is writing a custom loader that teaches Storybook's webpack to load `.md` files. That loader will do the following.

1. Take the content that was originally going to be loaded (the content of the `.md` file)
2. Feed the content into the transformation pipeline which will convert it into the props that my `PostDetails.tsx` component needs
3. Tell webpack instead of loading the content of the `.md` file, load the content of a javascript file that exports the props we created in the previous step

The loader will be pretty simple. All it needs to do is take the raw content of the `.md` file and convert it into the props using the method described above.

```tsx title=postLoader.ts
import { LoaderDefinitionFunction } from 'webpack'
import { getPostDetailProps } from 'lib/posts'

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
```

This might look scary so let's break it down. You can read more about how loaders work on the documentation, but I'll give a brief overview here.

Webpack loaders take a few parameters. They receive the raw content, a source map, and a few other parameters that aren't important for this discussion.

```tsx title=postLoader.ts {4}
import { LoaderDefinitionFunction } from 'webpack'
import { getPostDetailProps } from 'lib/posts'

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
```

Normally loaders `return{:js}` the final content from the function, but if the loader is async, you need to use the special `this.async(){:js}` callback and call it when your loader is done. The docs for this are [here](https://webpack.js.org/api/loaders/#asynchronous-loaders).

```tsx title=postLoader.ts {5}
import { LoaderDefinitionFunction } from 'webpack'
import { getPostDetailProps } from 'lib/posts'

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
```

Next we go convert the markdown to the props we need by calling our function. I choose to not call `getStaticProps` directly because I would have to "mock" out all the parameters that Next.js gives to this function. Instead, I want to call the function that converts a raw markdown file to props directly.

```tsx title=postLoader.ts {2, 7}
import { LoaderDefinitionFunction } from 'webpack'
import { getPostDetailProps } from 'lib/posts'

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
```

Lastly, we return the props that we converted the markdown file to, or an the error if there was one.

```tsx title=postLoader.ts {8-11}
import { LoaderDefinitionFunction } from 'webpack'
import { getPostDetailProps } from 'lib/posts'

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
} satisfies LoaderDefinitionFunction
```

You might be wondering why we return `` `module.exports = ${JSON.stringify(result)}` {:js}`` instead of just `result{:js}`. This is because to get `import post from 'posts/the-post-i-want-to-put-in-a-story.md'{:js}` to work the way we want, we need the file that this points to to be a javascript file that exports the props.

Once we have our loader, we have to hook it up with Storybook. Here is what the Storybook webpack config will look like.

```tsx title=.storybook/main.ts {15-24}
import type { StorybookConfig } from '@storybook/nextjs'

module.exports = {
  stories: ['../!(node_modules)/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.md$/,
      loader: require.resolve('./path/to/postLoader'),
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
} satisfies StorybookConfig
```

There's one problem though.

```ts title=.storybook/main.ts {6}
module.exports = {
  // ...
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.md$/,
      loader: require.resolve('./path/to/postLoader'),
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
} satisfies StorybookConfig
```

The webpack rule `loader` field is either a string pointing to an npm package or a file path to a javascript file to load. There isn't an option to hand it a function reference like this.

```ts title=.storybook/main.ts {1, 8-9}
import postLoader from './path/to/postLoader'

module.exports = {
  // ...
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.md$/,
      // ❌ Can't do this
      loader: postLoader,
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
} satisfies StorybookConfig
```

This means we have to either write the loader in plain javascript and commonjs modules, or we have to build our typescript and esm loader first and point the webpack rule to the build output. If you want to write your loader in plain javascript and cjs, then you can stop reading here and use the following loader.

```tsx title=postLoader.js
// We no longer have the ability to use absolute imports
// so we have to use relative paths now
const { getPostDetailProps } = require('../path/to/lib/posts')

module.exports = function (content, map) {
  const callback = this.async()

  getPostDetailProps(content.toString())
    .then(result =>
      callback?.(null, `module.exports = ${JSON.stringify(result)}`, map)
    )
    .catch(err => callback?.(err))
}
```

I on the other hand love typescript and wanted to challenge myself to to the extra mile to make this work.

## Building The Loader

What we need to do is create a script that builds our typescript and esm loader into plain javascript and commonjs. After that, we can reference the built loader's file path in our custom webpack config rule.

In my OSS packages like [storybook-addon-next](https://www.npmjs.com/package/storybook-addon-next). I've been able to get away with just using typescript's compiler `tsc`. This works fine when making standalone packages, but when I tried using `tsc` to build the loader within a Next.js repo, I found that it was clunky, difficult to work with, and awkward so I abandoned that approach for a tool better designed for building. I'll just skip to what worked for brevity's sake. I can make another post about this attempt if desired 🙂.

Enter [esbuild](https://esbuild.github.io/).

This tool has been receiving quite a buzz over the last few years so I was excited to try it out finally. After installing `esbuild` I created a `build.js` file next to `postLoader.ts` with a very simple config. For this file I bit the bullet and wrote it in javascript despite my love for typescript since it is a simple file and running raw typescript scripts in Node.js is annoying currently, but not impossible (see [ts-node](https://www.npmjs.com/package/ts-node)).

```js title=build.js
const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'postLoader.ts')],
  outdir: path.join(__dirname, 'dist'),
  platform: 'node',
  bundle: true
})
```

It's pretty simple but we can walk through it.

First we tell `esbuild` to build our `postLoader.ts` file. We don't need to add any additional files like `lib/posts` because `esbuild` can figure that out on its own.

```js title=build.js {4}
const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'postLoader.ts')],
  outdir: path.join(__dirname, 'dist'),
  platform: 'node',
  bundle: true
})
```

Next we tell it what directory we want the output built into.

```js title=build.js {5}
const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'postLoader.ts')],
  outdir: path.join(__dirname, 'dist'),
  platform: 'node',
  bundle: true
})
```

By default, `esbuild` outputs code designed for the browser so if we want to build code that runs in Node.js, then we have to specify `platform: 'node'`.

```js title=build.js {6}
const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'postLoader.ts')],
  outdir: path.join(__dirname, 'dist'),
  platform: 'node',
  bundle: true
})
```

Lastly, I found it difficult to have `esbuild` respect the `paths` and `baseUrl` properties of `tsconfig.json` when outputing unbundled code, so I just configured `esbuild` to bundle everything into one file. This isn't a problem for what we are doing though.

```js title=build.js {7}
const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'postLoader.ts')],
  outdir: path.join(__dirname, 'dist'),
  platform: 'node',
  bundle: true
})
```

Since we need to reference the built version of `postLoader.ts` we have to update the config to point to it in the `dist` directory next to `postLoader.ts`.

```ts title=.storybook/main.ts {6}
module.exports = {
  // ...
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.md$/,
      loader: require.resolve('./path/to/dist/postLoader'),
      // without this, webpack treats .md files like strings
      // but this loader converts it to json
      type: 'javascript/auto'
    })
    return config
  }
} satisfies StorybookConfig
```

Now whenever we want to run storybook, we just need to build the loader first so we need to run this script before starting storybook. We can do this by adding a `storybook:prepare` script in our `package.json` that we run before `storybook dev` or `storybook build`.

```json title=package.json
{
  "scripts": {
    "storybook": "yarn storybook:prepare && storybook dev -p 6006",
    "storybook:prepare": "node .storybook/loaders/build.js",
    "storybook:build": "yarn storybook:prepare && storybook build"
  }
}
```

Some might be hesitant to add a build step worrying about added build time. `esbuild` is _stupid fast_ so this wasn't a problem at all for me.

## Polishing Types

If you're using typescript, then you probably want to make sure that the `import post from 'posts/the-post-i-want-to-put-in-a-story.md'{:js}` is typed properly. To do this, we need to make a module declaration. We need to create a file ending in `.d.ts` and put it anywhere in the project so long as it is covered by [typescript's include config option](https://www.typescriptlang.org/tsconfig#include). I personally put module declarations in a `types` folder under the root of the repo. In that file, put the following content.

```ts title=markdown.d.ts
declare module '*.md' {
  // or wherever the type is defined
  import { Post } from 'lib/posts'

  const post: Post
  export default post
}
```

This tells typescript that any import from a `.md` file should be considered as having a default export of type `Post`.

If you use [Next.js's MDX feature](https://nextjs.org/docs/advanced-features/using-mdx), you might run into a problem with clashes with it's `declare module '*.md'` definition. In which case, we would need to disambiguate the module definitions by making our module definition more specific and rename our files accordingly. For example:

```ts title=markdown.d.ts {1}
declare module '*.post.md' {
  import { Post } from 'lib/posts'

  const post: Post
  export default post
}
```

And now our post file names should be named something like `the-post-i-want-to-put-in-a-story.post.md` and the import would be something like `import post from 'posts/the-post-i-want-to-put-in-a-story.md`.

That's it! Running `yarn storybook` or `storybook:build` works and I can see the posts render as normal in stories!

## The Real Code

The examples given here were simplified versions of what I actually created as to better communicate the concepts. For now, I only have one story configured for my post page which is just a "kitchen sink" post containing all the different things I could render in a post, but I'm considering rendering a story for every post I make.

If you want to see the actual code I wrote for this you can see it here.

- [postLoader.ts](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/.storybook/loaders/postLoader.ts)
- [build.js](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/.storybook/loaders/build.js)
- [My post page](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/pages/posts/%5Bslug%5D.tsx)
- [The stories for my post page](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/components/pages/posts/%5Bslug%5D/index.stories.tsx)
- [The post file I import into the stories](https://github.com/RyanClementsHax/ryanclements.dev/blob/7c711e8eff1340178572ac59bcc01e8b292eb2d9/posts/post-design-system.md)

## Conclusion

Don't be afraid to invent where you see holes. I had a ton of fun learning about these build tools and I'm so happy I was able to finally get this working. Feel free to reach out to me to let me know what you think!

That's all for now. Bye! 👋🏻
