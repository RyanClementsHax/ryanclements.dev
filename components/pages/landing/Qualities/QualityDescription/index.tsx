import { IconBadge } from 'components/IconBadge'

export interface QualityDescriptionProps {
  Icon: React.ReactNode
  title: string
  description: string
}

export const QualityDescription = ({
  Icon,
  title,
  description
}: QualityDescriptionProps) => (
  <li className="flex gap-6">
    <IconBadge>{Icon}</IconBadge>
    <div className="flex flex-col gap-3">
      <div className="text-on-surface-offBase font-bold text-lg">{title}</div>
      <div className="text-on-surface-offBase-muted">{description}</div>
    </div>
  </li>
)
