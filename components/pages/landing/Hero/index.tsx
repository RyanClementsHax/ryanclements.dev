import Image from 'next/image'
import banner from 'public/banner.jpg'
import React from 'react'

const Heading: React.FC<{
  title: string
  subtitle: string
}> = ({ title, subtitle }) => (
  <div className="grid gap-4 lg:col-span-2">
    <h1 className="text-4xl font-bold text-on-surface-base">
      <pre>{title}</pre>
    </h1>
    <h2 className="text-2xl text-on-surface-base-muted">
      <pre>{subtitle}</pre>
    </h2>
  </div>
)

const Banner = () => (
  <div className="relative h-full max-h-[500px] hidden md:block overflow-hidden rounded-xl shadow-md lg:col-span-3">
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

export interface HeroProps {
  title: string
  subtitle: string
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => (
  <section className="h-screen w-100 px-8 py-16">
    <div className="h-full grid gap-4 items-center md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
      <Heading title={title} subtitle={subtitle} />
      <Banner />
    </div>
  </section>
)
