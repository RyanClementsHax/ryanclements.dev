import { RenderablePostSummary } from 'lib/pages/posts'
import tomatoesPicture from 'public/tomatoes.jpg'

export const tomatoesImageData = {
  ...tomatoesPicture,
  alt: 'My family and I at a harvest festival'
}

export const postSummaries: RenderablePostSummary[] = [
  {
    slug: 'post-design-system',
    title: 'Post Design System for ryanclements.dev',
    description:
      'This is a post that contains all of the custom components and styles to make a post look awesome.',
    thumbnailSrc: tomatoesImageData
  },
  {
    slug: 'the-perfect-header-animation',
    title: 'The Perfect Header Animation',
    description:
      'Ever wondered how to create a header that animates in and out of view in perfect sync with scrolling?',
    publishedOn: 'Feb 3rd, 2022',
    thumbnailSrc: tomatoesImageData
  },
  {
    slug: 'using-webpack-loaders-for-nextjs-static-props-in-storybook',
    title: 'Using Webpack Loaders for Next.js Static Props in Storybook',
    description:
      'Using esbuild and a simple webpack loader, I found a way to just "import" the static props used by Next.js page components. You can even use node apis too!',
    publishedOn: 'Jul 14th, 2022',
    thumbnailSrc: tomatoesImageData
  }
]
