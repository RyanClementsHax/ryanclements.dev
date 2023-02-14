---
bannerAlt: spiderman reading a book by roadtripwithraj on Unsplash
updatedAt: 2023-02-14T18:32:09.602Z
publishedOn: 2023-01-29T05:00:00.000Z
description: >-
  Ever wondered how to create a header that animates in and out of view in
  perfect sync with scrolling?
title: The Perfect Header Animation
---

What do you enjoy about being deep in a facinating article? The content? Probably. The author? Maybe. Not being distracted while reading? Most certainly.

One thing that frequently gets in the way for me is when the website hosting the article has a header that hides or shows at even the _slightest_ scroll. [dropbox.tech](https://dropbox.tech), one of my favorite tech blogs, unfortunately does this.

![dropbox.tech's header animation is super sensitive to scrolling](/dropbox_tech_scroll.gif)

Personally, when I'm reading, I tend to do so on mobile. Because my thumb is scrolling while I'm processing the lines, thus covering the bottom half of lines, I keep my focused line at the top of the page. When all I'm doing is scrolling down, everything is fine, but if I so much as scroll up by a single pixel, the header crashes in often covering the line I'm currently trying to read. Annoying 😤.

[Medium](https://medium.com) however understands me 😍.

![Medium's header hides and shows in sync with scrolling](/medium_scroll.gif)

When it came time to build the header for my website. I knew, at least for the sake of my sanity, that I had to implement the animation I loved so much.

In this post, I'll take you through the journey of how I implemented this, why Medium's solution didn't work for me, and how I found the perfect solution in an unexpected place 🤔.

## Recreating Medium's header

<aside>

The repo containing this code can be found [here](https://github.com/RyanClementsHax/blog-perfect-header-animation). The examples I use are in react, but the concept holds for any framework of choice. The code for the header logic specifically can be found in [Header.tsx](https://github.com/RyanClementsHax/blog-perfect-header-animation/blob/main/components/Header.tsx).

</aside>

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

We wrap it in a `useEffect` with an empty dependency array because we only want this to run once. We return a cleanup function `() => window.removeEventListener('scroll', handler){:ts}` that unregisters this handler when this component is unmounted. See the react docs for more on how this works.

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

Now let's add the logic for what should happen on a scroll event. One way to think of the logic is like this:

1. Calculate the change in scroll position
2. Add that diff to the header's current `translationY` to get the new `translationY`, but bound it between `0` and the negative value of the header's height (also known as "clamping" the value between the two boundaries)
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

![The header with the animation applied](/first_attempt_implemented.gif)

## The problem

Simple solutions look great until they meet the requirements of the real world. Such was the case when I tried to implement this on my site.

What I want my header to also support, is on smaller screens, the following items.

1. I want to hide the navigation behind a "Menu" button that brings up a popover with all of the nav items
2. I want to use [headlessui's popover component](https://headlessui.com/react/popover) for this
3. I want to use fancy backdrop blurs
4. I want it to remain in the same place if the user scrolls.

Over all, it would look like this.

![An overlay on mobile that works with scrolling](/header_goal.gif)

Instead, this happens:

![An overlay on mobile that is broken scrolling](/first_attempt_failure.gif)

Why is this? Honestly, I'm having a hard time figuring this one out myself, but here is my current theory. Because the overlay wants to be absolutely positioned so it can be anchored to the viewport on scroll, it clashes with `position: sticky;{:css}` on the header seems to ruin this because the overlay becomes relative to _it_ instead of the viewport. Therefore, when it hides by being pushed up, the overlay gets pushed up too. What doesn't make sense is that the overlay doesn't seem to move up by the same amount, so therefore I feel like this explanation isn't completely accurate 🤷🏻‍♂️.

<aside>

Let me know if you figure out why this happens. I'd love to know and I'll update this post.

</aside>

Also you may have noticed that the fancy blurred backdrop that I wanted doesn't work any more. It applies only to the header. I'm not exactly sure why, but it seems that the blurred background gets messed up with `position: sticky;{:css}` on the header.

To solve these problems, I could keep the overlay and related open/close logic outside of the header, but this didn't work well with the popover component.

Getting around the background problem was simple. Only blur the background when the popover is closed. For the positioning problem, however, honestly, I was at loss for where to go. How could I get the header animation I wanted, but also support the popover for mobile devices. I was about ready to give up trying to have my cake and eat it too.

Que [tailwindui.com](https://tailwindui.com/).

## The perfect solution

[tailwindui.com](https://tailwindui.com/) is made by the folks who bring us [tailwind](https://tailwindcss.com/). It is a way for them to make some income by selling website templates. I follow their newsletter since their content is top tier 👌🏻 and found that they released a website template for a [personal website](https://spotlight.tailwindui.com/). Of course I had to check it out when I went to build my own personal website! To my chagrin, they use the EXACT header that I wanted!

Naturally I popped open Chrome's dev tools in attempt to pick apart how they were doing it and honestly it didn't make much sense to me. curiosity was killing me so I paid for the template myself. Honestly they deserve the money in my opinion.

Their solution is much more complex since it handles several other features, but the part that applies to what I needed ended up being.....somewhat.....simple. It uses a technique where the content in the header that you want to show and hide is wrapped in a div. That div gets the `position: sticky;{:css}` and `top: 0;{:css}` properties whereas the header itself has expandable height with a negative margin to off set the content below it.

If this sounds crazy to you, then yes, you're right, but it works 🤷🏻. The code is complicated so I'll have to save an explanation for a different post if y'all desire me to go into it. If you want to know how I implemented it, you can just look at the [source code for my header](https://github.com/RyanClementsHax/ryanclements.dev/blob/main/components/Header/Header.tsx) and [the accompanying hook that encapsulates this logic](https://github.com/RyanClementsHax/ryanclements.dev/blob/main/lib/utils/useHideAndShowWithScroll.ts).

## Conclusion

Getting simple things to work in css can be tiring, but you learn so much on the way. Often, it takes diving deep into code you didn't write and trying until you have that eureka moment. Recently, for me, this described the process of creating the header you now see on this website. I hope you enjoy it 😄.

That's all for now. Bye! 👋🏻
