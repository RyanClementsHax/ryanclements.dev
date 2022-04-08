import { IconBadge } from 'components/icons/IconBadge'

export interface QualityProps {
  Icon: React.ReactNode
  title: string
  description: string
}

export const Quality = ({ Icon, title, description }: QualityProps) => (
  <li className="flex gap-6">
    <IconBadge>{Icon}</IconBadge>
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold text-on-surface-offBase">{title}</div>
      <div className="text-on-surface-offBase-muted">{description}</div>
    </div>
  </li>
)
