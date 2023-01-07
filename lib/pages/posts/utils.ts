import { compareDesc, format } from 'date-fns'
import { PostSummary } from 'lib/content/posts/types'

export const formatDate = (date?: Date): string | undefined =>
  date ? format(date, 'MMM do, y') : undefined

export const sortPostSummaries = (
  postSummaries: PostSummary[]
): PostSummary[] =>
  postSummaries.slice().sort((a, b) => {
    if (a.publishedOn && b.publishedOn) {
      return compareDesc(a.publishedOn, b.publishedOn)
    } else if (a.publishedOn) {
      return 1
    } else if (b.publishedOn) {
      return -1
    } else {
      return 0
    }
  })
