import { PostSummary } from 'lib/content/posts/types'
import { sortPostSummaries } from './utils'

describe('post utils', () => {
  describe('sortPostSummaries', () => {
    it('sorts posts without a publish date to the beginning', () => {
      const summaries: PostSummary[] = [
        createSummary({
          title: 'yay published!',
          publishedOn: new Date(1, 2, 2022)
        }),
        createSummary({
          title: 'also published!',
          publishedOn: new Date(2, 2, 2022)
        }),
        createSummary({ title: 'not published yet', publishedOn: undefined }),
        createSummary({
          title: 'also not published yet',
          publishedOn: undefined
        })
      ]
      const sortedSummaries = sortPostSummaries(summaries)
      expect(sortedSummaries.map(x => x.title)).toEqual([
        'not published yet',
        'also not published yet',
        'also published!',
        'yay published!'
      ])
    })

    it('sorts posts by post date descending', () => {
      const summaries: PostSummary[] = [
        createSummary({
          title: '1',
          publishedOn: new Date(1, 2, 2022)
        }),
        createSummary({
          title: '2',
          publishedOn: new Date(2, 2, 2022)
        }),
        createSummary({
          title: '3',
          publishedOn: new Date(3, 2, 2022)
        }),
        createSummary({
          title: '4',
          publishedOn: new Date(4, 2, 2022)
        })
      ]
      const sortedSummaries = sortPostSummaries(summaries)
      expect(sortedSummaries.map(x => x.title)).toEqual(['4', '3', '2', '1'])
    })
  })
})

const createSummary = (summary: Partial<PostSummary>): PostSummary => ({
  slug: 'post-design-system',
  title: 'Post Design System for ryanclements.dev',
  description:
    'This is a post that contains all of the custom components and styles to make a post look awesome.',
  publishedOn: new Date(1, 2, 2022),
  ...summary
})
