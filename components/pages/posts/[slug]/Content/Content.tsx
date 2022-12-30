import { useReactFromHast } from 'lib/util/markdown/client'
import { HastTree } from 'lib/util/markdown/types'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'
import s from './Content.module.scss'
import c from 'classnames'
import Image, { ImageProps } from 'next/image'

export const Content: React.FC<{ root: HastTree }> = ({ root }) => {
  const children = useReactFromHast(root, components)
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
> = ({ alt, 'data-blurdataurl': blurDataURL, ...props }) => {
  return (
    // <figure>
    <Image
      {...(props as ImageProps)}
      alt={alt as string}
      placeholder="blur"
      blurDataURL={blurDataURL}
      // md breakpoint
      sizes="(max-width: 768px) 100vw, 768px"
      className="w-full rounded-lg object-cover shadow-md"
    />
    // <figcaption>{alt}</figcaption>
    // </figure>
  )
}

const components: ComponentsWithoutNodeOptions['components'] = {
  img: ContentImage
}
