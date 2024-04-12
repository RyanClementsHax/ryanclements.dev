---
bannerAlt: mismatched shoes by @jjik_da on Unsplash
publishedOn: 2024-04-12T04:00:00.000Z
description: 'Struggling with hydration mismatches in your Nuxt.js app? Dive into real-world examples and solutions in our latest blog post. Learn why hydration mismatches occur, how they impact your app, and practical tips for fixing them.'
title: Fixing Nuxt Hydration Mismatches in the Real World
---

Hydration mismatches are annoying and there's [plenty of content](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch) out there describing common causes and methods of remediation. I don't know about you, but I find them too simplistic and theoretical.

Real world hydration mismatches are _gnarly_.

![Example hydration warning](./example-hydration-warning.png)

I was recently hired to help a team with a Nuxt application they were maintaining. Their biggest frustration was the flood of hydration warnings they couldn't fix. In this post, I'll show you what hydratyion mismatches are, why they're a problem, and how to solve them using a few real world examples from this client project I was brought on.

## What is hydration?

A very simple website might have an HTML file that looks like this.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Counter App</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./client.js"></script>
  </body>
</html>
```

Once the browser downloads the JavaScript, it will run it where some framework will build the UI on the client's device resulting in a usable application.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Counter App</title>
  </head>
  <body>
    <div id="app">
      <h1>Hello, World!</h1>
      <p>Counter value is: 0</p>
      <!--
        The JavaScript will handle click events on this button
        and change the counter value in the paragraph above
      -->
      <button>+</button>
    </div>
    <script src="./client.js"></script>
  </body>
</html>
```

For large applications, building the UI on the client's device every time the page is loaded is very slow. This problem is especially pronounced on mobile devices making this type of architecture infeasible for performance sensitive applications like eCommerce sites.

As an optimization, when the web page is requested, the server can return pre-rendered HTML that the client script can just "pick up on".

Now all the client has to do, apart from some book keeping, is hook up event handlers. This results in a massive performance gain since the JavaScript doesn't have to create the HTML itself. This also improves [Core Web Vitals](https://web.dev/articles/vitals), SEO, and the user's experience.

In our simple example, the server would send this down as the initial HTML.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Counter App</title>
  </head>
  <body>
    <div id="app">
      <h1>Hello, World!</h1>
      <p>Counter value is: 0</p>
      <!--
        All our script has to do is hook up the event handler for this button
        as the HTML is already created
      -->
      <button>+</button>
    </div>
    <script src="./client.js"></script>
  </body>
</html>
```

## What are hydration mismatches?

Real world applications aren't this simple, however. Sometimes, when your framework tries to "pick up" where the server "left off", it notices a mismatch.

Let's say the server rendered this as part of the initial HTML.

```html
<p style="color: blue">Counter value is: 0</p>
```

...but the client thought the initial HTML should look like this...

```html
<p style="color: red">Counter value is: 0</p>
```

This results in something called a hydration mismatch. Attributes being mismatched are only one way this can happen. You can also observe this problem if there are mismatched tags, number of children, or incorrect text values.

The classic example of this is rendering the current time. Here is an example using Vue.

```vue
<template>
  <p>Current Time: {{ new Date().toISOString() }}</p>
</template>
```

Rendering `new Date().toISOString(){:js}` on the server results in a slightly different millisecond value than what the client sees. As a result you will see a hydration mismatch.

The server might render something like...

```html
<p>2024-04-12T14:40:58.029Z</p>
```

...but the client might render...

```html
<p>2024-04-12T14:40:59.725Z</p>
```

(Notice the different millisecond value at the end before the 'Z')

## Why are hydration mismatches a problem?

If any mismatch happens the client script has to blow away the work the server did and reconstruct the HTML from scratch itself.

This is problematic for a few reasons.

1. The work the server performed is wasted.
2. The user briefly sees a flash of an incorrect UI.
3. [Core Web Vitals](https://web.dev/articles/vitals) and SEO could be affected depending on what was mismatched.
4. The website could be noticeably slower depending on how much "fixing" the client has to do.

## Real world problems

With the theoretical groundwork laid out. Let's discuss some hydration mismatches I encountered with my client's Nuxt application and how to solve them.

## Problem 1: Third party libraries

Unfortunately, fixing mismatches isn't as simple as `ctrl + f`-ing for `new Date(){:js}` in a code base. Tracking these down is harder. You typically start with finding a warning like this in the browser's console.

```html
[Vue warn]: Hydration attribute mismatch on <img class=​"v-img__img v-img__img--preload v-img__img--contain" style src=​"https:​/​/​res.cloudinary.com/client/​image/​upload/​c_fit,w_100/​t_WebP/​logo?_a=BATAUVRg0" alt=​"My client">​
  - rendered on server: src="https://res.cloudinary.com/client/image/upload/c_fit,w_100/t_WebP/logo?_a=BATAUVRg0"
  - expected on client: src="https://res.cloudinary.com/client/image/upload/c_fit,w_100/t_WebP/logo?_a=BATAUVAA0"
```

Do you see the query param at the end of the image's url? The server rendered `BATAUVRg0`, but the client expected `BATAUVAA0` (the last three characters are different).

The first step is to figure out what is creating the image url. From there we can inspect the logic to understand how the `_a` query param is created.

This application uses Cloudinary for image hosting and uses its [sdk](https://www.npmjs.com/package/@cloudinary/url-gen#setup) to create the image urls. Taking from their docs, the setup looks like this.

```ts
// Import the Cloudinary class
import { Cloudinary } from '@cloudinary/url-gen'

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  },
  url: {
    secure: true // force https, set to false to force http
  }
})
```

Images are then generated by doing something like this.

```ts
import { fit } from '@cloudinary/url-gen/actions/resize'

const url = cld.image('some-id').resize(fit().width(width)).toURL()
```

Inspecting this further using good 'ol `console.log(url){:js}`, I could see it generated different urls between the server and client. Googling the problem showed that [I wasn't the only one experiencing this](https://community.cloudinary.com/discussion/472/url-generation-api-server-side-rendering-and-hydration-problems).

Diving into the code further confirmed that this was in fact due to cloudinary analytics. Behold! [The culprit](https://github.com/cloudinary/js-url-gen/blob/5705e8c546b849d33d6eaf1f9655fab3905eaada/src/sdkAnalytics/getSDKAnalyticsSignature.ts#L13).

```ts title=getSDKAnalyticsSignature.ts
function getNodeVersion() {
  const failedVersion = '0.0.0'
  if (typeof window !== 'undefined') {
    return failedVersion
  } else {
    // node env
    try {
      return process.versions.node || failedVersion
    } catch (e) {
      return failedVersion
    }
  }
}
```

This function is run to generate part of the `_a` query param. It specifically encodes the node version in the last three characters of the full string. The first few bits contain other encoded information like os type and sdk version.

I assume Cloudinary parses this code when the image is fetched by the browser then sent downstream for analytics purposes, but for us, it meant the browser was consistently encoding the last three characters as `AA0` whereas the server has the Node.js version encoded leading to the hydration mismatch!

Consulting the Cloudinary sdk docs, the solution here was to turn off analytics which you can do by setting `analytics` to `false{:js}` when creating the `Cloudinary` object.

```ts {10}
// Import the Cloudinary class
import { Cloudinary } from '@cloudinary/url-gen'

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  },
  url: {
    analytics: false
    secure: true // force https, set to false to force http
  }
})
```

You can also do this by manually overriding the Node.js version when creating the url, but the former was easier for us.

```ts
import { fit } from '@cloudinary/url-gen/actions/resize'

const url = cld
  .image('some-id')
  .resize(fit().width(width))
  .toURL({ trackedAnalytics: { techVersion: '20.0.7' } })
```

## Problem 2: Reactivity on the server

This one, I'll admit, was a doozy.

```html
[Vue warn]: Hydration class mismatch on <a class=​"v-btn v-theme--lightTheme v-btn--density-default v-btn--size-default v-btn--variant-text v-tab text-capitalize font-weight-medium" style href=​"/charters" tabindex=​"0" role=​"tab" aria-selected=​"false">​…​</a>​grid
  - rendered on server: class="v-btn v-theme--lightTheme v-btn--density-default v-btn--size-default v-btn--variant-text v-tab text-capitalize font-weight-medium"
  - expected on client: class="v-btn v-slide-group-item--active v-tab--selected v-theme--lightTheme v-btn--density-default v-btn--size-default v-btn--variant-text v-tab text-capitalize font-weight-medium"
```

The client rendered additional classes here (`v-slide-group-item--active v-tab--selected`) for a nav item in a tab group. These classes are supposed to be added for the selected nav item in the group based on the currently rendered route. The code looked like this with the initial selected value set to `0` by setting `:model-value="0"{:html}` on `v-tabs`.

```html
<v-tabs :model-value="0">
  <v-tab v-for="item in navItems">{{ item.title }}</v-tab>
</v-tabs>
```

The first thing I look for is some `if` statement dependent on `window` existing like the last example, but diving into the component library we were using for this link showed no such statement.

The application was using [Vuetify](https://vuetifyjs.com/en/) as a component library. It handles server rendering well so I was surprised it was resulting in hydration mismatches. Quick searches of similar errors on their issue tracker didn't yield anything either.

For a few hours, I was scratching my head until I set a bunch of `console.log(...){:js}` statements and learned what went wrong.

The link being rendered was part of a group of links. I found that for some reason, the selected link had a different `selected` value on the server than on the client. On the client, it was being recognized as the selected route, but not on the server.

I tracked this value down to Vuetify's [useGroup composable](https://github.com/vuetifyjs/vuetify/blob/352c82806145ddb57ee5df40fa8fbbe332a04aca/packages/vuetify/src/composables/group.ts#L156) that tracks selected state among group items.

When group items render, they [register themselves with the group root which updates some internal state](https://github.com/vuetifyjs/vuetify/blob/352c82806145ddb57ee5df40fa8fbbe332a04aca/packages/vuetify/src/composables/group.ts#L174).

The `selected` variable [is actually a `computed` varaible](https://github.com/vuetifyjs/vuetify/blob/352c82806145ddb57ee5df40fa8fbbe332a04aca/packages/vuetify/src/composables/proxiedModel.ts#L50). `computed` variables [don't have the same reactivity on the server](https://github.com/vuejs/vue/issues/10151) which was leading to different behaviors when the group items would register themselves during render on the server.

This logic could be patched in Vuetify, but it seems that we could work around it by not setting the initial selected value. I don't know why this works, but it was the quickest way to solve the issue ¯\\\_(ツ)\_/¯.

```diff
-<v-tabs :model-value="0">
+<v-tabs>
  <v-tab v-for="item in navItems">{{ item.title }}</v-tab>
</v-tabs>
```

## Problem 3: Invalid HTML

```html
[Vue warn]: Hydration children mismatch on <p>​…​</p>​<h4 redactor-attributes=​"[object Object]​" id=​"resources" style=​"direction:​ ltr;​ text-align:​ left;​">Resources​</h4>​<ul>​…​</ul>​</p>​
Server rendered element contains fewer child nodes than client vdom.
```

This was easily the sneakiest of all of the mismatches. Diving into the code and `console.log(...){:js}`-ing the output showed no differences between the client and the server. This seems like a good place to give up, but hang in there.

To solve this one, we need to know a thing or two with how the browser works.

It is easy to think that HTML allows for anything as invalid HTML doesn't often cause a compilation error, but invalid HTML actually exists. A common error is not closing a tag. Another, not so well known problem is invalid nesting. For example, you cant nest a `<p />{:html}` inside of another `<p />{:html}`.

When the browser encounters invalid HTML, it attempts to rewrite it to something valid. If the browser gets HTML like the following...

```html
<p>
  <p>Some content</p>
</p>
```

...it will actually rewrite it to be...

```html
<p></p>
<p>Some content</p>
<p></p>
```

It sees you attempt to open another `<p />{:html}` when inside of another `<p />{:html}` so it closes the first one for you thinking it was an error. This is why you can't see the issue from `console.log(...){:js}`-ing. The server and client are perfectly matched, it's the browser that mangles the HTML in between!

The client isn't hydrating seeing this from the server.

```html
<p>
  <p>Some content</p>
</p>
```

It's hydrating seeing this.

```html
<p></p>
<p>Some content</p>
<p></p>
```

This leads to a mismatch in the number of children. The first `<p />{:html}` tag should have 1 child not 0.

You're not able to see this by inspecting the HTML using the browser's dev tools because the HTML is already overridden by the client back to what the server rendered.

The issue had a pretty simple fix of ensuring all rendered HTML was valid to avoid browser rewrites.

Finding these issues can be challenging, but running the output of your server through an HTML validator can help. [@nuxtjs/html-validator](https://www.npmjs.com/package/@nuxtjs/html-validator) is one such tool.

## Conclusion

While there were plenty of other hydration mismatches I resolved, these were my favorite since they are representative of the kinds of mismatches you see in the wild. I've showed that resolving them takes some elbow grease, but there isn't a need to be afraid, only curious and persistent.
