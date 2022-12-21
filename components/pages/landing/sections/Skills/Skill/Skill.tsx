import { SkillInfo } from 'lib/content/skills'
import Image from 'next/image'
import { Proficiency } from '../Proficiency'

export interface SkillProps {
  skill: SkillInfo
}

export const Skill: React.FC<SkillProps> = ({
  skill: { name, logoSrc, proficiency }
}) => (
  <Container>
    <Image alt="logo" src={logoSrc} className="h-[50px] w-[50px] self-start" />
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
