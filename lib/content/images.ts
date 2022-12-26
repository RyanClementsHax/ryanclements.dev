import { Theme } from 'components/theme'
import { StaticImageData } from 'next/image'
import heroBannerLight from 'public/office-light.svg'
import heroBannerDark from 'public/office-dark.svg'
import qualitiesPicture from 'public/qualities-picture.jpg'
import thisIsATest from 'public/posts/this-is-a-test.jpg'

export interface A11yStaticImageData extends StaticImageData {
  alt: string
}

export const heroBannerSrcMap: Record<Theme, A11yStaticImageData> = {
  [Theme.light]: {
    ...heroBannerLight,
    alt: 'Me coding in my office with my wife reading a book to our daughter'
  },
  [Theme.dark]: {
    ...heroBannerDark,
    alt: 'Me in my office coding'
  }
}

export const qualitiesImageData: A11yStaticImageData = {
  ...qualitiesPicture,
  alt: 'Me and my daughter coding'
}

export const postsImageSrcMap: Record<string, A11yStaticImageData> = {
  'posts/this-is-a-test.jpg': {
    ...thisIsATest,
    alt: 'Tomatoes'
  }
}
