import { QualityInfo } from 'lib/qualities'
import Image, { StaticImageData } from 'next/image'
import { Subtitle } from '../../headings/Subtitle'
import { Title } from '../../headings/Title'
import { Quality } from './Quality'

export interface QualitiesProps {
  title: string
  subtitle: string
  graphicSrc: StaticImageData
  qualities: QualityInfo[]
}

export const Qualities = ({
  title,
  subtitle,
  graphicSrc,
  qualities
}: QualitiesProps) => (
  <Container>
    <Header title={title} subtitle={subtitle} />
    <GraphicContainer>
      <Graphic src={graphicSrc} />
    </GraphicContainer>
    <QualitiesList qualities={qualities} />
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-surface-offBase px-5 py-12 md:px-8 md:py-16">
    <section className="mx-auto grid max-w-screen-xl auto-rows-auto gap-8 md:grid-cols-[auto_20rem] md:grid-rows-[repeat(2,_auto)] md:gap-y-16 md:gap-x-24 lg:grid-cols-[auto_30rem]">
      {children}
    </section>
  </div>
)

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <hgroup className="flex flex-col gap-6">
    <Title className="md:text-left">{title}</Title>
    <Subtitle className="md:text-left">{subtitle}</Subtitle>
  </hgroup>
)

const QualitiesList = ({ qualities }: { qualities: QualityInfo[] }) => (
  <ul className="flex flex-col gap-12">
    {qualities.map(x => (
      <Quality key={x.title} {...x} />
    ))}
  </ul>
)

const GraphicContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="md:col-start-1 md:row-span-full md:flex md:flex-col md:justify-center">
    {children}
  </div>
)

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
