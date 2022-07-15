import { SkillInfo } from 'lib/skills'
import Image from 'next/image'
import { Proficiency } from '../Proficiency'

export type SkillProps = SkillInfo

export const Skill = ({ name, logoSrc, proficiency }: SkillProps) => (
  <Container>
    <Image alt="logo" layout="fixed" src={logoSrc} width={50} height={50} />
    <div className="flex flex-col gap-1">
      <span className="text-on-surface-base">{name}</span>
      <Proficiency className="self-start" level={proficiency} />
    </div>
  </Container>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 rounded-md bg-surface-base-elevation-100 p-3 shadow-md">
    {children}
  </div>
)
