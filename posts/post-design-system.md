---
title: 'Post Design System for ryanclements.dev'
publishedOn: '12/29/2022'
bannerAlt: 'tomatoes'
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

<aside class="info">
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

```js {1-3,4}
var foo = function (bar) {
  return bar++
}

console.log(foo(5))
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
