export interface ProjectsProps {
  children?: React.ReactNode
}

export const Projects = ({ children }: ProjectsProps) => (
  <section className="flex flex-col justify-center gap-8 p-5 md:gap-20 md:p-8">
    {children}
  </section>
)

const Header = ({ children }: { children?: React.ReactNode }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">{children}</hgroup>
)

Projects.Header = Header

const Group = ({ children }: { children?: React.ReactNode }) => (
  <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8">
    {children}
  </div>
)

Projects.Group = Group
