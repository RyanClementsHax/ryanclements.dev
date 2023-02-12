export interface MetaCardProps {
  title: string
  publishedOn?: string
}

export const MetaCard: React.FC<MetaCardProps> = ({ title, publishedOn }) => (
  <Container>
    <Title>{title}</Title>
    <PublishedDate>
      {publishedOn ?? <span className="italic">Draft</span>}
    </PublishedDate>
  </Container>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="text-2xl font-bold md:text-5xl">{children}</h1>
)

const PublishedDate: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => <p className="text-on-surface-base-muted">{children}</p>

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="-z-10 flex flex-col gap-3 rounded-md bg-gray-100 bg-opacity-60 p-5 text-on-surface-offBase shadow-lg backdrop-blur-xl backdrop-filter dark:bg-surface-base-elevation-300 dark:bg-opacity-60 md:gap-8 md:p-14">
    {children}
  </div>
)
