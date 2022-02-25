export interface ProjectsProps {
  children?: React.ReactNode
}

export const Projects = ({ children }: ProjectsProps) => (
  <section className="p-5 flex flex-col gap-8 md:p-8 md:gap-20 justify-center">
    {children}
  </section>
)

const Header: React.FC = ({ children }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">{children}</hgroup>
)

Projects.Header = Header

const Group: React.FC = ({ children }) => (
  <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
    {children}
  </div>
)

Projects.Group = Group
