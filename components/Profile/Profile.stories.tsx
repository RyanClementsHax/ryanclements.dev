import { Meta, Story } from '@storybook/react'
import { formatISO } from 'date-fns'

import { Profile, ProfileProps } from './Profile'

const Template: Story<ProfileProps> = props => <Profile {...props} />

export const Primary = Template.bind({})
Primary.args = {
  user: {
    nickname: 'RyanClementsHax',
    name: 'Ryan Clements',
    picture: 'https://avatars.githubusercontent.com/u/20916810?v=4',
    updated_at: formatISO(Date.now()),
    email: 'ryanclementshax@gmail.com',
    email_verified: true,
    sub: 'github|20916810'
  }
}

export default {
  title: 'Profile',
  component: Profile
} as Meta
