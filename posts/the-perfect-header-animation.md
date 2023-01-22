---
title: 'The Perfect Header Animation'
bannerAlt: 'tomatoes'
description: 'Ever wondered how to create a header that animates in and out of view in perfect sync with scrolling?'
---

What do you enjoy about being deep in a facinating article? The content? Probably. The author? Maybe. Not being distracted while reading? Most certainly. One thing that frequently gets in the way for me is when the website hosting the article has a header that hides or shows at even the _slightest_ scroll. [dropbox.tech](https://dropbox.tech), one of my favorite tech blogs, unfortunately does this.

![dropbox.tech's header animation is super sensitive to scrolling](/dropbox_tech_scroll.gif)

Personally, when I'm reading, I tend to do so on mobile. Because my thumb is scrolling while I'm processing the lines, thus covering the bottom half of lines, I keep my focused line at the top of the page. When all I'm doing is scrolling down, everything is fine, but if I so much as scroll up by a single pixel, the header crashes in often covering the line I'm currently trying to read 😤. Annoying.

[Medium](https://medium.com) however understands me 😍.

![Medium's header hides and shows in sync with scrolling](/medium_scroll.gif)

When it came time to build the header for my website. I knew, at least for the sake of my sanity, that I had to implement the perfect header animation. In this post, I'll take you through the journey of how I implemented this, why Medium's solution didn't work for me, and how I found the perfect animation in an unexpected place 🤔.

<aside>

All of the code in this post can be found in [the sample repo](https://github.com/RyanClementsHax/blog-perfect-header-animation).

The examples I use are in react, but the concept holds for any framework of choice

</aside>

## The first attempt

<aside>

The code for this part can be found in [FirstAttemptHeader.tsx](https://github.com/RyanClementsHax/blog-perfect-header-animation/blob/main/components/FirstAttemptHeader.tsx)

</aside>

I thought to myself.

> Cool, I'll just copy what Medium is doing.
> It's probably not that hard.

Oh was I wrong.

Let's start by trying to reverse engineer what Medium is doing.

![Medium is using a transform: translateY(value) approach](/what_medium_does.gif)

It might be hard to see, but what medium is doing is first setting `position: sticky;{:css}` and `top: 0;{:css}` in order to get the header to be anchored to the top. Then in javascript they use css's [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) property to move the header in and out out of view as the user scrolls. Also note that the value is only ever between `0` and `-98px`, the negative value of the header's height. More on this later.

Alright, simple enough. Let's get started on an implementation. Here is the component.

```tsx
import { useEffect, useRef } from 'react'

export const FirstAttempt: React.FC = () => {
  return <header>Header content!</header>
}
```

And some css to make it pretty. Notice the last two lines as being the important lines to make this work.

```css
header {
  display: flex;
  padding: 1rem;
  background: green;
  color: white;

  /* these are the styles that we need to make the hiding/showing work */
  position: sticky;
  top: 0;
}
```

This is what we get to start with.

![Header without animations](/first-attempt-raw.gif)

Now let's begin adding in that fancy animation. We are first going to need to add a handler to listen on scroll events.

```tsx {4-10}
import { useEffect, useRef } from 'react'

export const FirstAttemptHeader: React.FC = () => {
  useEffect(() => {
    const handler = () => {
      // TODO: add logic
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return <header>Header content!</header>
}
```

We wrap it in a `useEffect` because we only want this to run once. We return a cleanup function (`() => window.removeEventListener('scroll', handler){:ts}`) that unregisters this handler when this component is unmounted (see the react docs for more on how this works).

Because we will need to inline the `translationY` css property, we need a reference to the node we want to show and hide.

```tsx {4, 14}
import { useEffect, useRef } from 'react'

export const FirstAttemptHeader: React.FC = () => {
  const nodeRef = useRef<HTMLElement>(null!)
  useEffect(() => {
    let previousY: number | undefined = undefined
    let translationY = 0
    const handler = () => {
      // TODO: logic
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return <header ref={nodeRef}>Header content!</header>
}
```

Now let's add the logic. One way to think of the logic is like this:

1. Calculate the change in scroll position
2. Add the diff to the header's current `translationY` to get the new `translationY`, but bound it between `0` and the negative value of the header's height (also known as "clamping" the value between the two boundaries)
3. Set the header's inline style to the newly calculated `translationY`

Number 2 might take some explaining. If you look at the `translationY` value set on the header in the case of Medium's header (see below), you see that it follows this same logic. The `translationY` will never be more than `0` (positive values push the element down), and never be less than `-98px` (negative values push the element up) which just so happens to be the header element's height (you can see this by inspecting the element in the browser's dev tools).

![Medium is using a transform: translateY(value) approach](/what_medium_does.gif)

Let's add that logic in.

```tsx {6-7, 9-21}
import { useEffect, useRef } from 'react'

export const FirstAttemptHeader: React.FC = () => {
  const nodeRef = useRef<HTMLElement>(null!)
  useEffect(() => {
    let previousY: number | undefined = undefined
    let translationY = 0
    const handler = () => {
      const currentY = window.scrollY
      if (previousY === undefined) {
        previousY = currentY
        return
      }
      const diff = currentY - previousY
      previousY = currentY

      const { height } = nodeRef.current.getBoundingClientRect()

      translationY = Math.min(Math.max(translationY - diff, -height), 0)

      nodeRef.current.style.transform = `translateY(${translationY}px)`
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return <header ref={nodeRef}>Header content!</header>
}
```

Success!

![Our header with the animation applied](/first_attempt_implemented.gif)

## The problem

If your use case is as simple as this, you can probably stop reading, but you won't cuz you're totally enthralled, right 🤩? If you want to support mobile navigation then I suggest you continue reading.

What I want my header to also support, is on smaller screens, hide the navigation behind a "Menu" button that brings up an overlay with all of the nav items. I also want it to remain in the same place if the user scrolls. Like this:

![An overlay on mobile that works with scrolling](/header_goal.gif)

Instead, this happens:

![An overlay on mobile that is broken scrolling](/first_attempt_failure.gif)

Why is this? It is because the overlay wants to be absolutely positioned which makes sense if it wants to be anchored to the top of the viewport and be independent of scroll. Well, `position: sticky;{:css}` on the header runs this because the overlay becomes relative to _it_ instead of the viewport. Therefore, when it hides by being pushed up, the overlay gets pushed up too.

Also you may have noticed that the backdrop doesn't work any more. It applies only to the header. I'm not exactly sure why this is the case, but it seems to be also caused by the fact that my header uses a blurred background. Getting around that was simple. Only blur the background when the popover is closed.

Honestly, I was at loss for where to go from here. How could I get the header animation I wanted, but also support the popover for mobile devices. Que [tailwindui.com](https://tailwindui.com/).
