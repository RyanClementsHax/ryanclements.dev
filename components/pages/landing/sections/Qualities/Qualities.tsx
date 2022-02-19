import Image from 'next/image'
import { Subtitle } from '../../headings/Subtitle'
import { Title } from '../../headings/Title'
import { Quality } from './Quality'

export interface QualitiesProps {
  title: string
  subtitle: string
  graphicSrc: StaticImageData
  children?: React.ReactNode
}

export const Qualities = ({
  children,
  title,
  subtitle,
  graphicSrc
}: QualitiesProps) => (
  <div className="bg-surface-offBase px-5 py-12 md:px-8 md:py-16">
    <section className="max-w-screen-xl mx-auto grid auto-rows-auto gap-8 md:grid-rows-[repeat(2,_auto)] md:grid-cols-[auto_20rem] lg:grid-cols-[auto_30rem] md:gap-y-16 md:gap-x-24">
      <hgroup className="flex flex-col gap-6">
        <Title className="md:text-left">{title}</Title>
        <Subtitle className="md:text-left">{subtitle}</Subtitle>
      </hgroup>
      <div className="md:row-span-full md:col-start-1 md:flex md:flex-col md:justify-center">
        <Graphic src={graphicSrc} />
      </div>
      <ul className="flex flex-col gap-12">{children}</ul>
    </section>
  </div>
)

Qualities.Quality = Quality

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
