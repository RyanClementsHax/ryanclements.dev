import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import c from 'classnames'
import { HastTree } from 'lib/content/posts/types'
import s from './Content.module.scss'
import { Code } from './Code'
import { Callout } from './Callout'
import {
  convertToReact,
  ElementSubstitution,
  Options
} from 'lib/pages/posts/[slug]/client'

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

const ContentImage: ElementSubstitution<'img'> = ({
  alt,
  'data-blurdataurl': blurDataURL,
  ...props
}: JSX.IntrinsicElements['img'] & { 'data-blurdataurl'?: string }) => (
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

const Anchor: ElementSubstitution<'a'> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref: notNeededAndCausesTSErrors,
  ...props
}) =>
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

const Video: ElementSubstitution<'video'> = props => (
  <video
    controls
    {...props}
    className={c(props.className, 'w-full rounded-lg shadow-md')}
  />
)

const components: Options['components'] = {
  img: ContentImage,
  code: Code,
  aside: Callout,
  a: Anchor,
  video: Video
}
