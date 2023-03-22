import { ShareLinks } from './ShareLinks'

export interface MetaCardProps {
  title: string
  publishedOn?: string
  updatedAt?: string
}

export const MetaCard: React.FC<MetaCardProps> = ({
  title,
  publishedOn,
  updatedAt
}) => (
  <Container>
    <Title>{title}</Title>
    <PublishedDate publishedOn={publishedOn} updatedAt={updatedAt} />
    <ShareLinks title={title} />
  </Container>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="text-2xl font-bold md:text-5xl">{children}</h1>
)

const PublishedDate: React.FC<{
  publishedOn?: string
  updatedAt?: string
}> = ({ publishedOn, updatedAt }) => (
  <p className="flex flex-col gap-2 text-sm text-on-surface-base-muted md:flex-row md:text-base">
    {publishedOn ? (
      <>
        {publishedOn}
        {updatedAt && (
          <>
            <span className="hidden md:inline">•</span>
            <span>Updated {updatedAt}</span>
          </>
        )}
      </>
    ) : (
      <span className="italic">Draft</span>
    )}
  </p>
)

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-3 rounded-md bg-gray-100 bg-opacity-60 p-5 text-on-surface-offBase shadow-lg backdrop-blur-xl backdrop-filter dark:bg-surface-base-elevation-300 dark:bg-opacity-60 md:gap-8 md:p-14">
    {children}
  </div>
)
