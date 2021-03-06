import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'components/icons/GithubIcon'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { ProjectInfo, Tech } from 'lib/projects'

export type ProjectProps = ProjectInfo

export const Project = ({
  name,
  description,
  githubUrl,
  siteUrl,
  techs
}: ProjectProps) => (
  <Container>
    <div className="flex flex-col gap-4 p-8">
      <Header name={name} githubUrl={githubUrl} />
      <p className="text-on-surface-base">{description}</p>
      {siteUrl && <SiteLink href={siteUrl} />}
    </div>
    <Footer>
      {techs.map(x => (
        <TechDisplay key={x.name} tech={x} />
      ))}
    </Footer>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-xl bg-surface-base-elevation-100 shadow-md">
    {children}
  </div>
)

const Header = ({ name, githubUrl }: { name: string; githubUrl?: string }) => (
  <div className="flex items-center justify-between">
    <span className="font-bold text-on-surface-base">{name}</span>
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
      layout="fixed"
      height="24"
      width="24"
    />
    <span className="text-on-surface-offBase">{tech.name}</span>
  </div>
)

const GithubLink = ({ href }: { href: string }) => (
  <Link href={href} passHref>
    <a className="flex">
      <span className="sr-only">Github project url</span>
      <GithubIcon aria-hidden="true" className="text-on-surface-base" />
    </a>
  </Link>
)

const SiteLink = ({ href }: { href: string }) => (
  <Link href={href} passHref>
    <a className="flex w-fit gap-1 text-primary-700 dark:text-primary-400">
      Go to site
      <ArrowNarrowRightIcon
        aria-hidden="true"
        className="h-6 w-6 text-primary-500 dark:text-primary-400"
      />
    </a>
  </Link>
)
