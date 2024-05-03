---
bannerAlt: checklist by @glenncarstenspeters on Unsplash
publishedOn: 2024-05-03T04:00:00.000Z
description: >-
  Testing techniques like mocking are often overused, but can be justified. In
  this post I break down what justifies such techniques.
title: So you want to use Nuxt? Learn from my past projects.
updatedAt: 2024-05-03T21:03:27.647Z
---

## Story time

There are dozens of stellar libraries/frameworks we all want in our projects. For example, [Supabase, who went GA (Generally Available) just recently](https://supabase.com/ga), promises a backend-as-a-service-like experience. When making decisions on the projects we work on, it is tempting to include the shiny, hot tool, but know one thing.

> You don't know a technology unless you've used it in frustration.

Every tool comes with an asterix, fine print, tradeoffs, rough edges, etc. If you don't know what these are, you haven't used the tool for long enough!

Using Supabase as an example, the first project I used it for started off with productivity like no other. I was floored when I found out that [the Supabase cli comes with type generation](https://supabase.com/docs/guides/api/rest/generating-types). The [migrations](https://supabase.com/blog/supabase-local-dev) were working like a charm. I thought all was well until it came time to write my first transaction..........[what do you mean the supabase client doesn't support transactions?!?!?!?! 🤬🤬🤬](https://github.com/orgs/supabase/discussions/526)

In other words, [the client supabase provides](https://github.com/supabase/supabase-js), lets you interact with all of Supabase's features except transactions - arguably the reason why most people choose Supabase to begin with.

The are three ways around this. The first is to write your own [database function](https://supabase.com/docs/guides/database/functions) and forefeit type safety between the client and function (ew) on top of having to get good enough at SQL to write it. Second, you could connect directly to your instance and write raw SQL (double ew). Third, you could bring in a different ORM that will do that for you (yay, more dependencies 😒).

Oh, and if you do either of the latter two, you have to [reimplement Supabase's implementation of Row Level Security](https://github.com/drizzle-team/drizzle-orm/issues/594) if you want the Supabase client and your ORM to remain consistent.

Ever wonder why senior engineers are hesitant to move to newer technology? It's because of stuff like this. No offense is meant to the Supabase team; they do an awesome job, [they're planning to support this](https://github.com/orgs/supabase/discussions/526), and have a good reason for waiting.

That being said, where does this leave us? Are we to never adopt new technologies? How would we know when they're ready? Here is a rule of thumb.

> Adopt a technology when you understand it's down sides. If you don't know them, do more research

This dance, among some other forays I've had with the tool, gave me the needed insight. From this vantage point, I now more fully understand what Supabase should best be used for and when to use it in a project.

As part of [my software agency, Byte Bot](https://bytebot.io/), I help software teams with their Nuxt applications as part of the fuller offering of fullstack consulting in the React and Vue ecosystems. Through that work, I've seen seen Nuxt's limitations and helped teams grow with the tool.

Like Supabase, I love the tool and strongly recommend others try it. In this post, I want to share this wisdom I've gained from that consulting and help you reach the above rule faster, so you can be more confident in your decision wither to include Nuxt in your project.

## 🌎 First pain point: ecosystem size

The first Vue app I ever led was on was a green field project many years ago. As in any other project, we had a few choices to make. Which component library should we use? Which state management library should we adopt? How should we manage forms?

Well, there weren't a lot to choose from. At the time, [Bootstrap Vue](https://bootstrap-vue.org/) and [Vuetify](https://vuetifyjs.com/en/) were the only real choices for component libraries. [Vuex](https://vuex.vuejs.org/) was the only production ready state management solution. Lastly, [Vee-Validate](https://vee-validate.logaretm.com/v4/) was the only decent form library.

After building out the product for some time, Vue 3 was released which contained many amazing improvements coupled with just as many painful refactors (more on this later).

The ecosystem, being small was slow to migrate. Migration efforts were held back by your app's slowest package which, for us, was [Bootstrap Vue](https://bootstrap-vue.org/) whose maintainer went M.I.A. at the time. We wanted to swap to [Vuetify](https://vuetifyjs.com/en/), but Vue 3 compatibility wouldn't be production ready for over a year later.

React doesn't have this problem. React has the "largest player" status in the web development ecosystem as of today. Consequently, there's a library for _everything_. There's a course for _everything_. There's consultants _plenty_. The hiring pool is _massive_. Open source contributors, alibet as tired as the rest, are _many_. Adopting React is _safe_.

Vue, the rendering framework Nuxt is built on top of, has less adoption. Consequently, the libraries to choose from are smaller. The hiring pool is smaller. There aren't as many articles covering the niche errors you Google.

It isn't the end-all-be-all of web framework adoption, but to illustrate this point, [this is a graph from Stack Overflow that tracks the questions received for popular frameworks](https://insights.stackoverflow.com/trends?tags=reactjs%2Cvue.js%2Cangular%2Csvelte%2Cangularjs%2Cvuejs3).

![Trends of Stack Overflow tags of React, Angular, Vue3, Svelte, and Angularjs over time](./stack-overflow-trends-graph.png)

I say all of this to warn you against expecting benefits you would only expect from the "largest player". You don't have as much corporate money flowing into the ecosystem. Movement is slower. Resources are harder to find.

What Nuxt, and Vue as a whole, has that React doesn't have is a better compatibility story. Because there are fewer choices, the disparate libraries tend to work better together. This is bolstered by Vite's rapid rise the past few years.

## 🪄 Second pain point: magic
