---
title: 'Post Design System for ryanclements.dev'
bannerAlt: 'tomatoes'
description: 'This is a post that contains all of the custom components and styles to make a post look awesome.'
---

<!-- markdownlint-disable MD029 -->

## h2 Heading

### h3 Heading

## Horizontal Rules

---

---

---

## Emphasis

**This is bold text** that begins a paragraph

_This is italic text_ that begins a paragraph

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

## Callouts

<aside>
  I realize that using GitHub as my CMS is a little odd, but wonderful people
  like you contribute improvements to my open source content all the time and I
  appreciate that. So by keeping things in GitHub, that can continue. (Note the
  edit link at the bottom of every post).
</aside>

<aside class="info">
  This is like the one above but with the type explicitly "info"
</aside>

<aside class="info">

A `mix` of _markdown_ and <em>HTML</em>.

```js
const test = 'this is a code block in the aside'
```

`[1, 2, 3]{:js}`

</aside>

<aside class="success">
  I realize that using GitHub as my CMS is a little odd, but wonderful people
  like you contribute improvements to my open source content all the time and I
  appreciate that. So by keeping things in GitHub, that can continue. (Note the
  edit link at the bottom of every post).
</aside>

<aside class="warning">
  I realize that using GitHub as my CMS is a little odd, but wonderful people
  like you contribute improvements to my open source content all the time and I
  appreciate that. So by keeping things in GitHub, that can continue. (Note the
  edit link at the bottom of every post).
</aside>

<aside class="danger">
  I realize that using GitHub as my CMS is a little odd, but wonderful people
  like you contribute improvements to my open source content all the time and I
  appreciate that. So by keeping things in GitHub, that can continue. (Note the
  edit link at the bottom of every post).
</aside>

## Tasklist

- [ ] To do
- [x] Done

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Code

Inline `code`

Inline highlighted code `const code = "test"{:js}`

Block code "fences"

```text
Sample text here...
```

Syntax highlighting

```js
var foo = function (bar) {
  return bar++
}

console.log(foo(5))
```

Line highlighting

```rust {9, 16-18}
impl<T: 'static> AsyncRefCell<T> {
  /// Create a new `AsyncRefCell` that encapsulates the specified value.
  /// Note that in order to borrow the inner value, the `AsyncRefCell`
  /// needs to be wrapped in an `Rc` or an `RcRef`. These can be created
  /// either manually, or by using the convenience method
  /// `AsyncRefCell::new_rc()`.
  pub fn new(value: T) -> Self {
    Self {
      value: UnsafeCell::new(value),
      borrow_count: Default::default(),
      waiters: Default::default(),
      turn: Default::default(),
    }
  }

  pub fn new_rc(value: T) -> Rc<Self> {
    Rc::new(Self::new(value))
  }

  pub fn as_ptr(&self) -> *mut T {
    self.value.get()
  }

  pub fn into_inner(self) -> T {
    assert!(self.borrow_count.get().is_empty());
    self.value.into_inner()
  }
}
```

With title

```js title=next.config.js
// I'd love to convert this to .mjs but storybook-addon-next doesn't support importing mjs yet
/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')

/**
 * @type {import('next').NextConfig}
 **/
const config = {}

module.exports = () =>
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    })
  ].reduce((acc, next) => next(acc), config)
```

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ 'title text!')

Autoconverted link <https://github.com/nodeca/pica>

## Images

### Figure

![Minion](minion.png)

### Image between text

This is a test for an image in between text ![Stormtroopocat](stormtroopocat.jpg 'The Stormtroopocat') cuz I need a test case

### With title

![Stormtroopocat](stormtroopocat.jpg 'The Stormtroopocat')

### With image path as footnote

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: dojocat.jpg 'The Dojocat'
