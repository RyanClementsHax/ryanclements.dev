import Image from 'next/image'
import banner from 'public/banner.jpg'
import React from 'react'

const Heading: React.FC<{
  title: React.ReactNode
  subtitle: React.ReactNode
}> = ({ title, subtitle }) => (
  <div className="grid gap-4 lg:col-span-2">
    <h1 className="text-4xl font-bold text-on-surface-base">{title}</h1>
    <h2 className="text-2xl text-on-surface-base-muted">{subtitle}</h2>
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
  title: React.ReactNode
  subtitle: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => (
  <section className="h-screen w-100 px-5 py-12 md:px-8 md:py-16">
    <div className="h-full grid gap-4 items-center md:container md:mx-auto md:grid-cols-2 lg:grid-cols-5">
      <Heading title={title} subtitle={subtitle} />
      <Banner />
    </div>
  </section>
)
