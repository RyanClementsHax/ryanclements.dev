import Image from 'next/image'
import banner from 'public/banner.jpg'
import React from 'react'

export interface HeroProps {
  title: React.ReactNode
  subtitle: React.ReactNode
}

export const Hero = ({ title, subtitle }: HeroProps) => (
  <section className="w-100 h-screen px-5 py-12 md:px-8 md:py-16">
    <div className="grid h-full items-center gap-4 md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
      <Heading title={title} subtitle={subtitle} />
      <Banner />
    </div>
  </section>
)

const Heading = ({
  title,
  subtitle
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
}) => (
  <div className="grid gap-4 lg:col-span-2">
    <h1 className="text-4xl font-bold text-on-surface-base">{title}</h1>
    <h2 className="text-2xl text-on-surface-base-muted">{subtitle}</h2>
  </div>
)

const Banner = () => (
  <div className="relative hidden h-full max-h-[500px] overflow-hidden rounded-xl shadow-md md:block lg:col-span-3">
    <Image
      src={banner}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      placeholder="blur"
      priority
      alt="My wife, me, and our wedding party being silly"
    />
  </div>
)
