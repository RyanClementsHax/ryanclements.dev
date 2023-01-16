import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'components/icons/GithubIcon'
import { ProjectInfo, Tech } from 'lib/content/projects'
import { ArrowLink } from 'components/ArrowLink'

export interface ProjectProps {
  project: ProjectInfo
}

export const Project: React.FC<ProjectProps> = ({
  project: { name, description, githubUrl, siteUrl, techs }
}) => (
  <Container>
    <div className="flex flex-col gap-4 p-8">
      <Header name={name} githubUrl={githubUrl} />
      <p>{description}</p>
      {siteUrl && <ArrowLink href={siteUrl}>Go to site</ArrowLink>}
    </div>
    <Footer>
      {techs.map(x => (
        <TechDisplay key={x.name} tech={x} />
      ))}
    </Footer>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="card overflow-hidden bg-surface-base-elevation-100 p-0">
    {children}
  </div>
)

const Header = ({ name, githubUrl }: { name: string; githubUrl?: string }) => (
  <div className="flex items-center justify-between">
    <span className="font-bold">{name}</span>
    {githubUrl && <GithubLink href={githubUrl} />}
  </div>
)

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-4 bg-gray-50 px-8 py-4 dark:bg-surface-base-elevation-300">
    {children}
  </div>
)

const TechDisplay = ({ tech }: { tech: Tech }) => (
  <div className="flex gap-1.5">
    <Image
      aria-hidden="true"
      src={tech.logoSrc}
      alt="tech logo"
      className="h-[24px] w-[24px]"
    />
    <span className="text-on-surface-offBase">{tech.name}</span>
  </div>
)

const GithubLink = ({ href }: { href: string }) => (
  <Link href={href} className="flex">
    <span className="sr-only">Github project url</span>
    <GithubIcon />
  </Link>
)
