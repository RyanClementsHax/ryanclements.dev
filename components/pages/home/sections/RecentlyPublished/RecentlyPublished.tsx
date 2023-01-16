import { PostSummaryCard } from 'components/PostSummaryCard'
import { RenderablePostSummary } from 'lib/posts'
import { Subtitle } from 'components/headings/Subtitle'
import { Title } from 'components/headings/Title'

export interface RecentlyPublishedProps {
  postSummaries: RenderablePostSummary[]
  title: string
  subtitle: string
}

export const RecentlyPublished: React.FC<RecentlyPublishedProps> = ({
  title,
  subtitle,
  postSummaries
}) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <div className="mx-auto flex max-w-2xl  flex-col gap-5">
      {postSummaries.map(x => (
        <PostSummaryCard key={x.slug} post={x} />
      ))}
    </div>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col gap-16 bg-surface-offBase px-5 py-16 md:gap-16 md:px-8 md:py-24">
    {children}
  </section>
)

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <hgroup className="flex flex-col gap-6">
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </hgroup>
)
