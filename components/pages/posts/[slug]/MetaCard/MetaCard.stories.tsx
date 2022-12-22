import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import Image from 'next/image'
import mountains from './mountains.jpg'

import { MetaCard } from '.'

const Template: StoryFn = () => (
  <div className="relative p-5">
    <Image src={mountains} fill alt="Mountains" className="object-cover" />
    <MetaCard
      title="Storybook is super coolio"
      publishedOn={new Date(2022, 11, 22)}
    />
  </div>
)

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

export default {
  component: MetaCard
} as Meta
