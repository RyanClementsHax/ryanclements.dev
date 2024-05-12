---
bannerAlt: crossroads by @kylejglenn on Unsplash
publishedOn: 2024-05-11T04:00:00.000Z
description: >-
  Nuxt has limitations. Learn what they are and how to use them to your
  advantage.
title: Read this before adopting Nuxt
---

There are dozens of stellar libraries/frameworks we all want in our projects like Nuxt. I recognize the value Nuxt can bring so I advocate it's use as part of my software agency [Byte Bot](https://bytebot.io/nuxt), where we, in part, help software teams adopt, scale, and maintain their Nuxt applications.

That being said, every tool has it's downsides, and if you don't know what they are, you either haven't looked hard enough or used it long enough. I have a personal mantra about this.

> You don't know a technology unless you've used it in frustration.

Nuxt is no exception. Even though it's developer experience is unparalleled, documentation spotless, and community welcoming, Nuxt applications aren't suited for every project.

Nuxt's pros are well covered on it's documentation and in other articles advocating its use. I'd like to augment that information with the hard lessons I've learened using Nuxt so you'll be better informed whether Nuxt is the right option for you. Stick around to the end to find out how Nuxt's limitations are also it's strengths 👀.

<aside>

Thanks to [Daniel Roe](https://twitter.com/danielcroe), lead Nuxt maintainer, and [Alex Lichter](https://twitter.com/TheAlexLichter), Nuxt core team member, for their input on this post.

</aside>

## Nuxt has limitations

### Nuxt's ecosystem size is frustrating

The first Vue app I ever led was on was a green field project many years ago. As in any other project, we had a few choices to make. Which component library should we use? Which state management library should we adopt? How should we manage forms?

Well, there weren't a lot to choose from. At the time, [Bootstrap Vue](https://bootstrap-vue.org/) and [Vuetify](https://vuetifyjs.com/en/) were the only real choices for component libraries. [Vuex](https://vuex.vuejs.org/) was the only production ready state management solution. Lastly, [Vee-Validate](https://vee-validate.logaretm.com/v4/) was the only decent form library.

After building out the product for some time, Vue 3 was released which contained many amazing improvements coupled with just as many painful refactors.

The ecosystem, being small was slow to migrate. Migration efforts were held back by your app's slowest package which, for us, was [Bootstrap Vue](https://bootstrap-vue.org/) whose maintainer went M.I.A. at the time. We wanted to swap to [Vuetify](https://vuetifyjs.com/en/), but Vue 3 compatibility wouldn't be production ready for over a year later.

React doesn't suffer from problem as much. React has the "largest player" status in the web development ecosystem as of writing this. Consequently, there's a library for _everything_. There's a course for _everything_. The hiring pool is _massive_. Open source contributors, alibet as tired as the rest, are _many_. Adopting React is _safe_.

Vue, the rendering framework Nuxt is built on top of, has less adoption. Consequently, the pool of libraries to choose from are smaller. The hiring pool is smaller. There aren't as many articles covering the niche errors you Google. [It can feel frustrating](https://twitter.com/McPizza0/status/1786383839608156650).

It isn't the end-all-be-all metric demonstrating web framework adoption, but to illustrate this point, [this is a graph from Stack Overflow that tracks the questions received for popular frameworks](https://insights.stackoverflow.com/trends?tags=reactjs%2Cvue.js%2Cangular%2Csvelte%2Cangularjs%2Cvuejs3).

![Trends of Stack Overflow tags of reactjs, angularjs, angular, vue.js, vuejs3, and svelte over time](./stack-overflow-trends-graph.png)

I say all of this to warn you against expecting benefits you would only expect from the "largest player". You don't have as much corporate money flowing into the ecosystem. Movement is slower. Resources are harder to find.

### Corporate support for Nuxt is lacking

Byte Bot has a client that uses Nuxt with [Uniform](https://www.uniform.dev/), a CMS. There ended up being an issue in their integration we had to solve.

After hours of debugging, we looked at [Uniform's public documentation for Nuxt](https://docs.uniform.app/docs/learn/tutorials/nuxt). Unfortunately the docs were sorely under-developed and at times out of date. Even their public repos couldn't provide something simple as a working "Hello, World" application.

You know what they did have plenty documentation on though? Next.js 😒. Out of [23 examples in their example repo](https://github.com/uniformdev/examples/tree/157321212e1fce18d0e0692a301097eb70059ce4/examples), 16 of them are for Next.js! 19 of them use React! How many examples use Nuxt? 2 and there wasn't any documentation on how to get them working 🥲.

We had to resort to escalating to technical support to solve our issue. Luckily they were able to help us.

This isn't meant to throw shade on Uniform. They were very helpful when we needed them. The point is if you decide to use Nuxt, don't expect seemless integrations outside of the Vue ecosystem. From a business perspective, it doesn't have the adoption to justify investing in such integration stories.

### Nuxt's developer experience can be suprising

I have never been graced by a developer experience like the one Nuxt has. It feels ✨magical✨. It feels like this not just when using Nuxt, but even when working on the core repo.

Nuxt has every part of development figured out. Here are just a few amazing things it does for you that not even frameworks like Next.js do for you.

- Automatically imports components from the [components/](https://nuxt.com/docs/guide/directory-structure/components) folder (and have it work with TypeScript!)
- Has [devtools](https://devtools.nuxt.com/) that tell you anything you would ever need to know about your website
- [@nuxt/kit](https://nuxt.com/docs/guide/going-further/kit), a first-party library for module authors
- [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing), a first-party library for unit and e2e testing with a one line config to set up

The way Nuxt is able to provide such an experience is through ✨magic✨. It does some wild things at build time to provide such a seemless experience. For example, Nuxt rewrites your components to allow you to use common vue imports like `ref` and `reactive` without having to import them. It also does this when you use Nuxt's composables like [useRuntimeConfig](https://nuxt.com/docs/api/composables/use-runtime-config).

This ✨magic✨, as great as it is, can sometimes get in the way. I spend a lot of time in Nuxt's Discord, being an MVP there. The most common quesiton I personally see is some form of "why can't I mock [useRuntimeConfig](https://nuxt.com/docs/api/composables/use-runtime-config)?".

This is confusing for most people since they're used to mocking what they manually import, but Nuxt does ✨magic✨ to handle this for you hence the issues.

It can also be difficult to navigate the repo with all these layers of indirection not to mention the traditional gripes people have with magic of this kind.

In summary, the developer experience is amazing, but ✨magic✨ comes with a 💰price💰.

## Nuxt's limitations are also it's strengths

### How the lack of libraries can make you faster

There aren't many libraries 👉 _BUT_ 👈 this means less analysis paralysis. This 👏 is 👏 liberating 👏.

In addition, for the packages that do exist integrate exceedingly well with each other **because everyone is using the same libraries**.

Let's examine a library called TanStack Query. It is a client side data-fetching/caching library built to be framework agnostic. The examples are taken straight from [the docs](https://tanstack.com/query/latest).

This is what you need to do to set it up for Next.js's app directory as of writing this.

First you have to set up the query client on the page you want to render, prefetch the query, dehydrate the client, and set up the provider.

```tsx title=app/page.tsx
import { dehydrate, Hydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'
import { getPosts } from './getPosts'
import { Posts } from './Posts'

// We have to cache the query client as to scope it per request
const getQueryClient = cache(() => new QueryClient())

export default async function MyPage() {
  // Get the query client
  const queryClient = getQueryClient()
  // Prefetch the query
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts })
  // Dehydrate the client
  const dehydratedState = dehydrate(queryClient)

  return (
    // Set up the provider
    <Hydrate state={dehydratedState}>
      <Posts />
    </Hydrate>
  )
}
```

Then in a client component, you can use the query like usual.

```tsx title=app/Posts.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts } from './getPosts'

export function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the "MyPage"-component, data will be available immediately either way
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
}
```

It isn't bad. It definitely has boilerplate though. Now, but look at what you have to do for Nuxt.

```ts title=nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@hebilicious/vue-query-nuxt']
})
```

It's only one line! Not only that, but when used in combination with [$fetch](https://nuxt.com/docs/api/utils/dollarfetch) your queries can have end to end type safety with your backend. Achieving this with Next.js requires bringing in another library like [tRPC](https://trpc.io/).

```vue title=pages/index.vue
<script setup lang="ts">
const { data, suspense } = useQuery({
  queryKey: ['todos'],
  queryFn: () => $fetch('/api/todos') // This is typed to whatever the handler at server/api/todos.ts returns
})

// Do this if you want to prefetch the query
onServerPrefetch(async () => {
  await suspense()
})
</script>
<template>
  {{ data }}
</template>
```

Check out [@hebilicious/vue-query-nuxt](https://nuxt.com/modules/vue-query). It's pretty awesome.

Nuxt's ability to provide such an integration experience is in part because Nuxt has a slick module system. I argue that another reason is because Nuxt, having a smaller ecosystem, doesn't have as many use cases to support. This allows Nuxt's module system to be simpler!

The ecosystem as a whole can spend more time improving the compatibility between the small set of libraries that already exist rather than supporting only the small common denominator between the permutations of use cases. Tanstack Query is just one example of many I've come by working with Vue and Nuxt.

### Being second has it's own benefits

I think it's fair to say that Vue/Nuxt is #2 if not #3 following React/Next.js both in terms of popularity and feature velocity. This is a handy position to be in because you can learn from the mistakes of your forerunner(s)!

React's release of hooks was revolutionary, but it's implementation was less than perfect \*cough\* \*cough\* `useEffect(){:js}`. This gave Vue the vantage point of learning from React's mistakes and creating the composition API. This isn't to say that it isn't without flaws, but it was definitely a step forward.

Next.js is now pushing React Server Components and Server Actions hard. I'm glad that Nuxt is slower to adopt these practices. Nuxt will be better because of it.

### Less corporate support means simplicity

Have you ever looked at the React or Next.js code base? They're gnarly. They're far harder to work in and understand because they have far more contributors and need to handle so many use cases.

Nuxt and Vue, for lack of this, are simpler projects. They're easier to understand, easier to debug, easier to build code on top of, and easier to contribute to!

I've tried to contribute to Next.js before, but I found the repo too difficult to understand to contribute regularly. With Nuxt, on the other hand, I was able to make my first contribution in less than a week's worth of free time.

To demonstrate this, one of our clients had an issue with the way `<NuxtImg />{:html}` handles loading images in the `public` folder. I had a solution within 20 minutes because the code was so much simpler to debug. You don't have that kind of productivity with Next.js or React.

### Nuxt's developer experience is unparalleled

Even though ✨magic✨ can bite you in the butt, ✨magic✨ is called that for a reason. Things Just Work ™️ in Nuxt with relatively few lines of code. Compared to working in Next.js, I find myself generally more productive.

## Bottom line on Nuxt

Nuxt is an impressive project that makes it easy to create, maintain, and scale a variety of web applications. Like any technology, it has limitations and the failure to recognize these will lead to disappointment.

When properly understood, these limitations are actually better considered as tradeoffs. When leveraged correctly, they can help rather than hinder your project reach its goals.

Consequently, we at Byte Bot recommend Nuxt for application development on many projects especially if any of the following are true.

1. You or your team are more productive using Vue
2. You or your team don't require robust ecosystem support for third party integrations
3. You or your team can get far enough with the existing libraries in the Vue/Nuxt ecosystem

If you or anyone would like help implementing, scaling, or maintaining your Nuxt application, [Byte Bot](https://bytebot.io/nuxt) is ready to help.

<aside>

Thanks again to [Daniel Roe](https://twitter.com/danielcroe), lead Nuxt maintainer, and [Alex Lichter](https://twitter.com/TheAlexLichter), Nuxt core team member, for their input on this post.

</aside>
