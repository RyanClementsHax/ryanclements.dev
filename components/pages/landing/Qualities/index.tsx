import Image from 'next/image'

export interface QualitiesProps {
  title: string
  subtitle: string
  graphicSrc: StaticImageData
}

export const Qualities: React.FC<QualitiesProps> = ({
  children,
  title,
  subtitle,
  graphicSrc
}) => (
  <section className="bg-surface-offBase p-5 flex flex-col gap-12">
    <hgroup className="flex flex-col gap-6">
      <h2 className="font-bold uppercase tracking-wider text-center text-on-surface-offBase">
        {title}
      </h2>
      <h3 className="font-title font-black text-3xl text-center text-on-surface-offBase">
        {subtitle}
      </h3>
    </hgroup>
    <Graphic src={graphicSrc} />
    <ul className="flex flex-col gap-12">{children}</ul>
  </section>
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
