import { convertToReact } from 'lib/content/posts/rendering'
import { HastTree } from 'lib/content/posts/types'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import s from './Content.module.scss'
import c from 'classnames'
import Image, { ImageProps } from 'next/image'
import { Code } from './Code'
import { Callout } from './Callout'
import Link from 'next/link'

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

const components: ComponentsWithoutNodeOptions['components'] = {
  img: ContentImage,
  code: Code,
  aside: Callout,
  a: Anchor
}
