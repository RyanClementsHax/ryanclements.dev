import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import c from 'classnames'
import { HastTree } from 'lib/content/posts/types'
import s from './Content.module.scss'
import { Code } from './Code'
import { Callout } from './Callout'
import { convertToReact } from 'lib/pages/posts/[slug]/client'

export const Content: React.FC<{
  root: HastTree
}> = ({ root }) => {
  const children = convertToReact(root, components)
  return (
    <div
      className={c(s.content, 'prose prose-zinc max-w-none dark:prose-invert')}
    >
      {children}
    </div>
  )
}

const ContentImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & { 'data-blurdataurl'?: string }
> = ({ alt, 'data-blurdataurl': blurDataURL, ...props }) => (
  <Image
    {...(props as ImageProps)}
    alt={alt as string}
    placeholder="blur"
    blurDataURL={blurDataURL}
    // md breakpoint
    sizes="(max-width: 768px) 100vw, 768px"
    className="w-full rounded-lg object-cover shadow-md"
  />
)

const Anchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = props =>
  props.href?.startsWith('#') ? (
    <a {...props} />
  ) : (
    <Link
      {...props}
      href={props.href ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
    />
  )

const Video: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = props => (
  <video
    controls
    {...props}
    className={c(props.className, 'w-full rounded-lg shadow-md')}
  />
)

const components: ComponentsWithoutNodeOptions['components'] = {
  img: ContentImage,
  code: Code,
  aside: Callout,
  a: Anchor,
  video: Video
}
