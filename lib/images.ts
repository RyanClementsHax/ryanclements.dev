import { StaticImageData } from 'next/image'
import heroPicture from 'public/hero-picture.jpg'
import qualitiesPicture from 'public/qualities-picture.jpg'

export interface A11yStaticImageData extends StaticImageData {
  alt: string
}

export const heroImageData = {
  ...heroPicture,
  alt: 'My family and I at a harvest festival'
}

export const qualitiesImageData = {
  ...qualitiesPicture,
  alt: 'Me and my daughter coding'
}
