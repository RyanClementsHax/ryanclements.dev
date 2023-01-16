import { PostSummaryCard } from 'components/PostSummaryCard'
import { RenderablePostSummary } from 'lib/posts'

export interface RecentlyPublishedProps {
  postSummaries: RenderablePostSummary[]
}

export const RecentlyPublished: React.FC<RecentlyPublishedProps> = ({
  postSummaries
}) => (
  <Container>
    {postSummaries.map(x => (
      <PostSummaryCard key={x.slug} post={x} />
    ))}
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="bg-surface flex flex-col justify-center gap-8 p-5 py-16 md:gap-24 md:p-8 md:py-24">
    {children}
  </section>
)
