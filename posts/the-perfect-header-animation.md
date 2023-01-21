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

## The first attempt

I thought to myself.

> Cool, I'll just copy what Medium is doing.
> It's probably not that hard.

Oh was I wrong.

Let's start by trying to reverse engineer what Medium is doing.

![Medium is using a transform: translateY(value) approach](/what_medium_does.gif)

It might be hard to see, but what medium is doing is first setting `position: sticky;{:css}` and `top: 0;{:css}` in order to get the header to be anchored to the top. Then in javascript they use css's [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) property to move the header in and out out of view.
