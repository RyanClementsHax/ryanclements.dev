---
title: 'Seamlessly using Next.js static props in Storybook components'
bannerAlt: 'construction vehicle by @zacedmo on Unsplash'
description: 'How to use Next.js static props in Storybook components using static imports, esbuild, and webpack'
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

## Hope
