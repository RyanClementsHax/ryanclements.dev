import { ProjectInfo } from 'lib/content/projects'
import React from 'react'
import { Subtitle } from 'components/headings/Subtitle'
import { Title } from 'components/headings/Title'
import { Project } from './Project'

export interface ProjectsProps {
  title: string
  subtitle: string
  projects: ProjectInfo[]
}

export const Projects: React.FC<ProjectsProps> = ({
  title,
  subtitle,
  projects
}) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <Group>
      {projects.map(x => (
        <Project key={x.name} project={x} />
      ))}
    </Group>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col justify-center gap-8 p-5 py-16 md:gap-24 md:p-8 md:py-24">
    {children}
  </section>
)

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <hgroup className="flex flex-col gap-4 md:gap-6">
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </hgroup>
)

const Group = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8">
    {children}
  </div>
)
