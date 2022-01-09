import Image from 'next/image'
import { Description } from './Description'

export interface QualitiesProps {
  title: string
  subtitle: string
  graphicSrc: StaticImageData
}

export const Qualities: React.FC<QualitiesProps> & {
  Description: typeof Description
} = ({ children, title, subtitle, graphicSrc }) => (
  <div className="bg-surface-offBase">
    <section className="max-w-screen-xl mx-auto p-5 grid auto-rows-auto gap-8 md:grid-rows-[repeat(2,_auto)] md:grid-cols-[20rem_auto] lg:grid-cols-[30rem_auto] md:gap-y-16 md:gap-x-24">
      <hgroup className="flex flex-col gap-6">
        <h2 className="font-bold uppercase tracking-wider text-center text-on-surface-offBase md:text-left">
          {title}
        </h2>
        <h3 className="font-title font-black text-3xl text-center text-on-surface-offBase md:text-left">
          {subtitle}
        </h3>
      </hgroup>
      <div className="md:row-span-full md:col-end-[-1] md:flex md:flex-col md:justify-center">
        <Graphic src={graphicSrc} />
      </div>
      <ul className="flex flex-col gap-12">{children}</ul>
    </section>
  </div>
)

Qualities.Description = Description

const Graphic = ({ src }: { src: StaticImageData }) => (
  <div className="overflow-hidden rounded-xl shadow-md">
    <Image
      src={src}
      layout="responsive"
      objectFit="cover"
      objectPosition="center"
      placeholder="blur"
      alt="Some graphic"
    />
  </div>
)
