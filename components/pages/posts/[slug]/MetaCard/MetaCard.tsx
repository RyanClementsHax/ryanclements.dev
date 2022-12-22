export interface MetaCardProps {
  title: string
  publishedOn: Date
}

export const MetaCard: React.FC<MetaCardProps> = ({ title, publishedOn }) => (
  <MetaContainer>
    <Title>{title}</Title>
    <PublishedDate>{publishedOn.toDateString()}</PublishedDate>
  </MetaContainer>
)

const Title: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h1 className="text-2xl font-bold md:text-5xl">{children}</h1>
)

const PublishedDate: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => <p className="text-on-surface-base-muted">{children}</p>

const MetaContainer: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <div className="flex flex-col gap-3 rounded-md bg-gray-100 bg-opacity-60 p-5 text-on-surface-offBase shadow-lg backdrop-blur-xl backdrop-filter dark:bg-zinc-700 dark:bg-opacity-60 md:gap-10 md:p-16">
    {children}
  </div>
)
