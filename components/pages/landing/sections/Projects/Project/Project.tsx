import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'components/icons/GithubIcon'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { ProjectInfo } from 'lib/projects'

export type ProjectProps = ProjectInfo

export const Project = ({
  name,
  description,
  githubUrl,
  siteUrl,
  techs
}: ProjectProps) => (
  <div className="overflow-hidden rounded-xl bg-surface-base-elevation-100 shadow-md">
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <span className="font-bold text-on-surface-base">{name}</span>
        {githubUrl && (
          <Link href={githubUrl} passHref>
            <a className="flex">
              <span className="sr-only">Github project url</span>
              <GithubIcon aria-hidden="true" className="text-on-surface-base" />
            </a>
          </Link>
        )}
      </div>
      <p className="text-on-surface-base">{description}</p>
      {siteUrl && (
        <Link href={siteUrl} passHref>
          <a className="flex w-fit gap-1 text-primary-700 dark:text-primary-400">
            Go to site
            <ArrowNarrowRightIcon
              aria-hidden="true"
              className="h-6 w-6 text-primary-500 dark:text-primary-400"
            />
          </a>
        </Link>
      )}
    </div>
    <div className="flex flex-wrap gap-4 bg-gray-50 px-8 py-4 dark:bg-surface-base-elevation-300">
      {techs.map(x => (
        <div key={x.name} className="flex gap-1.5">
          <Image
            aria-hidden="true"
            src={x.logoSrc}
            alt="tech logo"
            layout="fixed"
            height="24"
            width="24"
          />
          <span className="text-on-surface-offBase">{x.name}</span>
        </div>
      ))}
    </div>
  </div>
)
