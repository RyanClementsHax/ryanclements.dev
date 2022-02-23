import Link from 'next/link'
import Image from 'next/image'
import githubIcon from 'public/icons/github-icon.svg'

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
  <div className="shadow-md rounded-xl">
    <div className="p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-bold">{name}</span>
        <Link href={githubUrl} passHref>
          <a className="flex">
            <span className="sr-only">Github project url</span>
            <Image
              aria-hidden="true"
              src={githubIcon}
              alt="github icon"
              layout="fixed"
              height="24"
              width="24"
            />
          </a>
        </Link>
      </div>
      <span>{description}</span>
      {siteUrl && (
        <Link href={siteUrl} passHref>
          <a className="text-primary-700">Go to site</a>
        </Link>
      )}
    </div>
    <div className="flex px-8 py-4 bg-gray-50">
      {techs.map(x => (
        <span key={x.name}>{x.name}</span>
      ))}
    </div>
  </div>
)
