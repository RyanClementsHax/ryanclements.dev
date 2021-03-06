import { ProjectInfo } from 'lib/projects'
import React from 'react'
import { Subtitle } from 'components/pages/landing/headings/Subtitle'
import { Title } from 'components/pages/landing/headings/Title'
import { Project } from './Project'

export interface ProjectsProps {
  title: string
  subtitle: string
  projects: ProjectInfo[]
}

export const Projects = ({ title, subtitle, projects }: ProjectsProps) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <Group>
      {projects.map(x => (
        <Project key={x.name} {...x} />
      ))}
    </Group>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col justify-center gap-8 p-5 md:gap-20 md:p-8">
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
