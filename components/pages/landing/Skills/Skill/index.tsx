import Image from 'next/image'
import { Proficiency, ProficiencyLevel } from '../Proficiency'

export interface SkillProps {
  name: string
  src: StaticImageData
  proficiency: ProficiencyLevel
}

export const Skill = ({ name, src, proficiency }: SkillProps) => (
  <div className="p-3 rounded-md shadow-md flex gap-3">
    <Image alt="logo" layout="fixed" src={src} width={50} height={50} />
    <div className="flex flex-col gap-1">
      <span className="text-on-surface-base">{name}</span>
      <Proficiency className="self-start" level={proficiency} />
    </div>
  </div>
)
