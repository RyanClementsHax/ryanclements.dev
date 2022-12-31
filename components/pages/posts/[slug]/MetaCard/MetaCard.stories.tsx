import { Meta, StoryFn } from '@storybook/react'
import { createDefaultStories } from 'stories/storyUtils'
import Image from 'next/image'
import mountains from './mountains.jpg'

import { MetaCard, MetaCardProps } from '.'

const Template: StoryFn<MetaCardProps> = props => (
  <div className="relative p-5">
    <Image src={mountains} fill alt="Mountains" className="object-cover" />
    <MetaCard {...props} />
  </div>
)

Template.args = {
  title: 'Storybook is super coolio',
  publishedOn: 'Dec 22nd, 2022'
}

const { Base, Mobile, DarkTheme, DarkThemedMobile } =
  createDefaultStories(Template)

export { Base, Mobile, DarkTheme, DarkThemedMobile }

const { DraftBase, DraftMobile, DraftDarkTheme, DraftDarkThemedMobile } =
  createDefaultStories(Template, {
    prefix: 'Draft',
    additionalArgs: {
      publishedOn: undefined
    }
  })

export { DraftBase, DraftMobile, DraftDarkTheme, DraftDarkThemedMobile }

export default {
  component: MetaCard
} as Meta
