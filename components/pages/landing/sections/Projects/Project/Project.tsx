import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'components/icons/GithubIcon'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

export interface Tech {
  name: string
  logoSrc: StaticImageData
}

export interface ProjectProps {
  name: string
  description: string
  githubUrl: string
  siteUrl?: string
  techs: Tech[]
}

export const Project = ({
  name,
  description,
  githubUrl,
  siteUrl,
  techs
}: ProjectProps) => (
  <div className="shadow-md rounded-xl overflow-hidden bg-surface-base-elevation-100">
    <div className="p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-bold text-on-surface-base">{name}</span>
        <Link href={githubUrl} passHref>
          <a className="flex">
            <span className="sr-only">Github project url</span>
            <GithubIcon aria-hidden="true" className="text-on-surface-base" />
          </a>
        </Link>
      </div>
      <p className="text-on-surface-base">{description}</p>
      {siteUrl && (
        <Link href={siteUrl} passHref>
          <a className="flex gap-1 text-primary-700 dark:text-primary-400 w-fit">
            Go to site
            <ArrowNarrowRightIcon
              aria-hidden="true"
              className="text-primary-500 dark:text-primary-400 w-6 h-6"
            />
          </a>
        </Link>
      )}
    </div>
    <div className="flex px-8 py-4 gap-4 bg-gray-50 dark:bg-surface-base-elevation-300">
      {techs.map(x => (
        <div key={x.name} className="flex gap-1.5">
          <Image
            aria-hidden="true"
            className="rounded-full"
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
