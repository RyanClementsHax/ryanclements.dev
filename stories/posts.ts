import { RenderablePostSummary } from 'lib/pages/posts'
import postDesignSystemBanner from 'public/posts/post-design-system/banner.jpg'
import thePerfectHeaderAnimationBanner from 'public/posts/the-perfect-header-animation/banner.jpg'
import seamlesslyUsingNextjsStaticPropsInStorybookBanner from 'public/posts/seamlessly-using-nextjs-static-props-in-storybook/banner.jpg'

export const postSummaries: RenderablePostSummary[] = [
  {
    slug: 'post-design-system',
    title: 'Post Design System for ryanclements.dev',
    description:
      'This is a post that contains all of the custom components and styles to make a post look awesome.',
    thumbnailSrc: {
      ...postDesignSystemBanner,
      alt: 'computer showing design system by balazsketyi on Unsplash'
    }
  },
  {
    slug: 'the-perfect-header-animation',
    title: 'The Perfect Header Animation',
    description:
      'Ever wondered how to create a header that animates in and out of view in perfect sync with scrolling?',
    publishedOn: 'Feb 3rd, 2022',
    thumbnailSrc: {
      ...thePerfectHeaderAnimationBanner,
      alt: 'spiderman reading a book by roadtripwithraj on Unsplash'
    }
  },
  {
    slug: 'seamlessly-using-nextjs-static-props-in-storybook',
    title: 'Seamlessly using Next.js static props in Storybook',
    description:
      'How to use Next.js static props in Storybook using static imports, esbuild, and webpack',
    publishedOn: 'Jul 14th, 2022',
    thumbnailSrc: {
      ...seamlesslyUsingNextjsStaticPropsInStorybookBanner,
      alt: 'construction vehicle by @zacedmo on Unsplash'
    }
  }
]
