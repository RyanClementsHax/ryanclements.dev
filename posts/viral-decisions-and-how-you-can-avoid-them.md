---
bannerAlt: virus by @fusion_medical_animation on Unsplash
publishedOn: 2024-03-22T04:00:00.000Z
description: >-
  This blog post explores how some decisions can have viral effects on a
  project's health. In this post we explore this concept using real-world case
  studies to illustrate the importance of careful decision-making and proactive
  maintenance strategies.
title: Viral Decisions and How You can Avoid Them
---

In the light of COVID, we are all very familiar with how quickly a virus can spread and the damage it can cause. What is not known as well is how certain decisions take on viral characteristics in software projects. In the world of coding, seemingly minor decisions can have profound implications for the long-term health and success of a project.

While these decisions may seem inconsequential at the time, they can accumulate and, while under the pressure of real world constraints, create a ripple effect that virally atrophies the project's future stability, scalability, and maintainability.

In this blog post, I'll lay out the concept of virality in decision making within software development and how I've seen it play out in the real world. I'll discuss the types of small decisions that can have a rippling impact on a project's long-term health, and suggest ways to avoid these problems. By understanding these dynamics, you'll be empowered to make smarter decisions that will have your future self thanking you.

## Case studies

### Case study 1: Uber and data modelling

A year or so ago, I remember reading an article about how Uber's early design choices put them in a corner. Originally, Uber supported a one-driver-one-rider model. Consequently, this was reflected in their data model. Well, as they grew, the one-driver-one-rider model no longer made sense as they introduced features like UberPool where one trip could have multiple riders.

It sounds like a simple update, but their entire architecture was built on that fundamental model. All of their relevant code assumed there was only ever one rider.

Think about how many places have lines like `riderService.getRiderDetails(trip){:js}` or `trip.rider` that suddenly need to change to `riderService.getAllRiderDetails(trip){:js}` or `trip.riders`. Think of all the database tables that suddenly need schema refactors. Think about how all of this needs to be deployed incrementally as the system is too big to redeploy all at once. Think about how many new edge cases and partial error scenarious now need to be handled.

Supporting this new feature properly would have been a massive refactor. In order to ship, they threw on a few hacks, but these patches accumulated into a serious problem overtime leading them to rewrite much of their architecture. This rewrite was expensive, but desperately needed. On top of this, the one-driver-one-rider model wasn't the only assumption that didn't stand the test of time so multiply this work by the number of all the assumptions that turned sour.

<aside>

I can't find the link to the exact article I read. The closest I could find was one about the [rewrite of thier fulfillment platform](https://www.uber.com/blog/fulfillment-platform-rearchitecture/), one about the [rewrite of their driver app](https://www.uber.com/blog/rewrite-uber-carbon-app/) and one about [the rewrite of their rider app](http://spaceisdisorienting.com/refactoring-the-uber-rider-app). All of them are in part plagued by problems in their data model.

</aside>

Even if this wasn't true, It got me thinking about how certain decisions in software compound into massive problems over time because they _force_ engineers to code a certain way that at scale is expensive to undo. In Uber's case it was their restrictive data modelling, but data modelling is just one class. Let's discuss a few others.

### Case study 2: Fire Channels and asynchronicity

During my stay in Amazon, I had the pleasure of working on Fire Channels, a Fire TV app that allowed users to watch heaps of ad enabled content. It was built using a server driven UI (SDUI) architecture.

<aside>

SDUI is more common than you might think. For example, [Airbnb uses it too](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5).

</aside>

When the app would load up, it would make a request to the server for what to display. The server wouldn't just send back data to populate the interface, _it would send the description of the interface itself with the data already populated into it_. This allowed us to circumvent lengthy app update cycles whenever we wanted to make a UI change.

One of the pages was the browse page which looked like this.

![Fire channels browse page](./fire-channels-browse-page.png)

A typical SDUI implementation would model the response for that page roughly like this.

```jsonc
{
  "data": [
    {
      "id": "browse-page",
      "type": "page",
      "ttl": 86400000, // 1 day
      "nav": [
        {
          "id": "navigation",
          "type": "navigation",
          "children": [
            {
              "id": "home-link",
              "type": "link",
              "text": "Home",
              "iconUrl": "..."
            },
            {
              "id": "news-link",
              "type": "link",
              "text": "News",
              "iconUrl": "..."
            }
            // ... and so on
          ]
        }
      ],
      "children": [
        {
          "id": "live-news-row",
          "type": "row",
          "title": "Live News",
          "children": [
            {
              "id": "abc-news-tile",
              "type": "tile",
              "title": "ABC News",
              "isLive": true,
              "thumbnailUrl": "..."
            },
            {
              "id": "livenow-tile",
              "type": "tile",
              "title": "LiveNOW",
              "isLive": true,
              "thumbnailUrl": "..."
            },
            {
              "id": "cbs-news-tile",
              "type": "tile",
              "title": "CBS News",
              "isLive": true,
              "thumbnailUrl": "..."
            }
          ]
        }
        // ... and so on
      ]
    }
  ]
}
```

This has the benefit of being very straightforward. It is very easy to construct the UI given a hierarchy of components (or widgets as we called them in Fire Channels). The downside is that granular caching is difficult.

We had a business requirement where the rows needed to be cached no longer than 15 minutes so we can take them down ASAP if something went wrong e.g. a sports tile somehow made it into a music video row.

At the same time, we wanted to keep the rest of the page cached. Reducing traffic to the backend from 55 million daily active users resulted in serious 💰💰💰. We could patch on granular cacheability to the previous model, but we instead went with this data model that made it easier.

```jsonc
{
  "data": [
    {
      "id": "browse-page",
      "type": "page",
      "nav": ["navigation"],
      "children": ["live-news-row", "sports-news-row"]
    }
  ]
}
```

Instead of components referencing their children directly, they now referenced their children's ids instead. Whenever the UI rendered component, it would instead ask the backend to resolve the id at runtime. This gave us the granular caching we wanted.

To ensure we didn't make a request for every child, we prepopulated the response with data we knew it would need and cached it on device. This made it easy to have a "components" cache where each component could have its own time to live (TTL).

The response actually looked something like this.

```jsonc
{
  "data": [
    {
      "id": "browse-page",
      "ttl": 86400000, // 1 day
      "type": "page",
      "nav": ["navigation"],
      "children": ["live-news-row", "sports-news-row"]
    }
  ],
  "additionalData": [
    {
      "id": "navigation",
      "ttl": 86400000, // 1 day
      "type": "navigation",
      "children": [
        "home-link",
        "news-link"
        // ... and so on
      ]
    },
    {
      "id": "home-link",
      "ttl": 86400000, // 1 day
      "type": "link",
      "text": "Home",
      "iconUrl": "..."
    },
    {
      "id": "news-link",
      "ttl": 86400000, // 1 day
      "type": "link",
      "text": "News",
      "iconUrl": "..."
    },
    {
      "id": "live-news-row",
      "ttl": 900000, // 15 minutes
      "type": "row",
      "title": "Live News",
      "children": ["abc-news-tile", "livenow-tile", "cbs-news-tile"]
    },
    {
      "id": "abc-news-tile",
      "ttl": 900000, // 15 minutes
      "type": "tile",
      "title": "ABC News",
      "isLive": true,
      "thumbnailUrl": "..."
    },
    {
      "id": "livenow-tile",
      "ttl": 900000, // 15 minutes
      "type": "tile",
      "title": "LiveNOW",
      "isLive": true,
      "thumbnailUrl": "..."
    },
    {
      "id": "cbs-news-tile",
      "ttl": 900000, // 15 minutes
      "type": "tile",
      "title": "CBS News",
      "isLive": true,
      "thumbnailUrl": "..."
    }
  ]
}
```

This was all perfectly fine during the design stage. What we didn't anticipate was the forced asynchronicity on the entire code base. Before, rendering would look something like this (using JavaScript as pseudocode).

```ts
function render(component) {
  switch (component.type) {
    case 'page':
      renderPage(component)
      break
    case 'navigation':
      renderNavigation(component)
      break
    case 'link':
      renderLink(component)
      break
    case 'row':
      renderRow(component)
      break
    case 'tile':
      renderTile(component)
      break
  }
}

function renderPage(page) {
  render(page.navigation)
  for (const child of children) {
    render(child)
  }
}

// ... and so on
```

Because we introduced this level of indirection, any rendering of children is inherently asynchronous now.

```ts
async function render(component) {
  switch (component.type) {
    case 'page':
      await renderPage(component)
      break
    case 'navigation':
      await renderNavigation(component)
      break
    case 'link':
      await renderLink(component)
      break
    case 'row':
      await renderRow(component)
      break
    case 'tile':
      await renderTile(component)
      break
  }
}

async function renderPage(page) {
  const navigationComponents = await backend.resolveComponents(page.navigation)
  await render(navigationComponents)
  const children = await backend.resolveComponents(page.children)
  for (const child of children) {
    await render(child)
  }
}

// ... and so on
```

I'm making this look easy in JavaScript, but the additional asychronicity added tons of complexity when implementing this in Android. Each component now needed its own loading and error states (since network requests can fail).

On Android, you run into a problem of where you're going to put that state since there isn't a clean way to persist it. Android didn't develop a componentized UI framework until the creation of [Jetpack Compose](https://developer.android.com/jetpack/compose) so this was especially hard for us.

Additionally, how are you going to manage all of those extra tasks you spawn? You need to cancel them if the app backgrounds and that isn't straightforward with our version of Android either. Don't get me started on the problems `RecyclerView` caused us 🤦‍♂️.

This of course didn't stop us from shipping because my team was awesome sauce 💪. Yet, this early design choice inadvertantly led to many bugs because of the forced asychronicity not to mention the additional mental overhead that it took to understand the code.

This case study, like Uber's, is tied to data modelling, but also brings to light consequences of async logic. If you make one thing async, now suddenly the rest of your code base needs to be converted.

<aside>

Embracing the virality of asynchronicity is considered best practice in most languages, [including C#](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/3c059e80d5ca253a096b1535a9fc73aa5f4c76b0/AsyncGuidance.md#asynchrony-is-viral), but you have to [be prepared for the consequences](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/3c059e80d5ca253a096b1535a9fc73aa5f4c76b0/AsyncGuidance.md#timer-callbacks).

</aside>

### Case study 3: CrowdCoursing and domain isomorphism

[CrowdCoursing](https://www.crowdcoursing.com/) is an awesome company that handles volunteer management for school districts. Through [my agency](https://bytebot.io/) I've done work for them and noticed something in their front end during onboarding.

They have concepts called "rooms" and "events". Rooms are places to gather on their platform and events are the individual things that get scheduled. For example, an ecology club might have their own room and they might schedule events for community clean up.

When I looked through the code, however, I found things named using terms like "pod" and "session". I talked with the main developer about this it turns out those were their original terms for room and event respectively. They originally used pod and session because that's what made sense to them during COVID when the company started. They changed it to room and event after getting feedback from their users indicating that the original terms were too confusing. Being a startup, they didn't have the bandwidth to change all of the terminology their code used so the software existed in an awkward limbo where half of the code base used the former terms and half used the latter 😖.

Consequently, when adding new features or fixing bugs, developers had a choice of either:

1. Fixing the existing terminology to the new terminology but spend extra time
2. Keeping the existing terminology and keeping the code consistent but make the existing problem worse

When you're a startup in this position both options kinda suck 🤷‍♂️. I prefer the former, but it depends on your situation.

This is just one example of a larger topic called "domain isomorphism". In other words, how well does your code map to your domain? If you don't fix domain isomorphism problems in your code, they spread virally because developers often go with option #2 on top of how developers already often copy/paste from elsewhere in the code base to get their work done.

If you think back to the Uber case study, in a way, this was also another problem they had! Their domain evolved past the original assumptions they made and now they were stuck in a similar situation!

This isn't just a problem with naming things. This also rears its head in architecture. Mark Richards has [excellent](https://www.youtube.com/watch?v=LwSyX9AA3_0&t=38s&ab_channel=MarkRichards) [videos](https://www.youtube.com/watch?v=h4gslYApgO0&ab_channel=MarkRichards) [describing](https://www.youtube.com/watch?v=Wz-uCJgL90I&ab_channel=MarkRichards) what he calls "domain to architecture isomorphism" or how well your architecture maps to your domain. For example, order placing is an inherently asynchronous business process, if you use synchronous communications between services, you'll have a bad time 💥.

## Strategies for making better decisions

I've laid out a few examples of how some decisions force themselves to replicate, but what are we to do about them? In Uber's case it was absolutely the right thing to do to ship with the simplified domain they had. In Fire Channel's case granular caching was absolutely the right decision plus we needed to ship quickly. In CrowdCoursing's case, they didn't find out about this problem until a bunch of the code was already written. I have a few thoughts to offer.

### Nip it in the bud

As a heuristic, think twice if you're making decisions that impact architecture or domain modelling. I've found these problems to largely come from mistakes in these two areas. For Uber, they didn't think about domain evolvability. For Fire Channels, we didn't think about separating our UI rendering architecture from our backend schema. For CrowdCoursing, we didn't prioritize domain isomorphism as much as we should have.

### Quicken your feedback loops

Don't let your feedback come too late for you to make changes. The tigher the feedback loops are on your team or product, the easier it is to pivot when these issues arise or attempt to perpetuate.

Attempt to get feedback in all stages of product development from design to deployment. This loop will help guide you in the right direction. If possible attempt to encode feedback in type systems, tests, or linting rules. This is the quickest feedback you can ask for since it happens on `ctrl + s`.

### Create anti-corruption layers (ACLs)

Anticorruption layers are a concept in [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD). They're a set of defensive patterns placed between the module you want to protect and the module that is infected with problems.

You can think of this as a translation layer or custodian that allows a module, service or system to think and model in terms that make the most sense while working with a foreign system that doesn't have these concepts.

For example, in Fire Channels, if I could go back, I would have built a layer that converted from what the server was returning to the idealized json originally presented.

### Continuously clean

Especially when it comes to domain modelling, you'll never get it right 100% of the time. You can't fully understand it anyway until you ship and get real user feedback. Instead, the strategy should be to prioritize a portion of your bandwidth to tech debt.

Engineering teams should be empowered to not only add features to their systems _but also to maintain them_. What happens when you drive your car without getting an oil change? It is the same thing that happens to a software project when you don't fix any tech debt.

Massive balls of mud aren't created over night; they're added to incrementally when we tell ourselves sweet lies like "we'll get to it later" or "when we have time". Product managers aren't rewarded for stopping feature development, so you shouldn't expect the pressure to ever let up.

By default, I like to keep 10% of bandwidth dedicated to tech debt and to modify this as needed; however, I NEVER make this 0. Fixing tech debt is like exercising. The hardest day to go to the gym is the day after you skipped a workout.

The best way to deal with these problems is to accept the reality they will happen, even against our best efforts as Uber's case shows. Create processes on your teams to hande the cleanup before they cripple your business.

### Don't stop migrations half way

Like with CrowdCoursing, stopping half way is damaging to the project's health. As painful as it can be, especially when these migrations take a while, they're worth the time and focus you spend on them. CrowdCoursing has since done a great job following through and is seeing higher product development as a result.

<aside>

Some companies have found it helpful to graph progress for these migrations. Having something publicly visible that goes up and to the right is great for morale. Automated slack messages whenever progress is made is also helpful.

</aside>

## Conclusion

Software is hard. You'll never get everything 100% correct. Sometimes your decisions have compounding impacts for the worse. That being said, there's hope for remediation.

I've presented some case studies of how software problems can become viral and provided some solutions for addressing them. Regardless of what you do, don't be afraid to ship. You'll notice that for each of these examples, these were luxury problems to have i.e. problems that come from success.

With that said, let's schedule some tech debt clean up and ship a feature or two knowing we can handle what comes our way 🚀.
