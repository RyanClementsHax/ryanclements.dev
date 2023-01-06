import { IconBadge } from 'components/icons/IconBadge'
import {
  CubeIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { QualityInfo } from 'lib/content'

export interface QualityProps {
  quality: QualityInfo
}

export const Quality: React.FC<QualityProps> = ({
  quality: { icon, title, description }
}) => (
  <li className="flex gap-6">
    <IconBadge>{iconMap[icon]}</IconBadge>
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold text-on-surface-offBase">{title}</div>
      <div className="text-on-surface-offBase-muted">{description}</div>
    </div>
  </li>
)

const iconMap: Record<QualityInfo['icon'], React.ReactNode> = {
  UserGroup: <UserGroupIcon />,
  Cube: <CubeIcon />,
  PresentationChartLine: <PresentationChartLineIcon />
}
