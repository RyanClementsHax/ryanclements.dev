import { IconBadge } from 'components/IconBadge'

export interface DescriptionProps {
  Icon: React.ReactNode
  title: string
  description: string
}

export const Description = ({ Icon, title, description }: DescriptionProps) => (
  <li className="flex gap-6">
    <IconBadge>{Icon}</IconBadge>
    <div className="flex flex-col gap-3">
      <div className="text-on-surface-offBase font-bold text-lg">{title}</div>
      <div className="text-on-surface-offBase-muted">{description}</div>
    </div>
  </li>
)
