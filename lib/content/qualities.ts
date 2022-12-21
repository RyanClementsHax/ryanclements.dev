export interface QualityInfo {
  title: string
  description: string
  icon: 'UserGroup' | 'Cube' | 'PresentationChartLine'
}

export const qualities: QualityInfo[] = [
  {
    title: 'People first',
    description:
      'I see people as beloved by God and worth going the extra mile for. At work, I always try to help my coworkers and solve real problems for users.',
    icon: 'UserGroup'
  },
  {
    title: 'Modern',
    description:
      'Up to date with the latest trends in industry, I synthesize custom solutions using the best of what modern software engineering has available to us.',
    icon: 'Cube'
  },
  {
    title: 'Always improving',
    description:
      "“Whether you think you can, or you think you can't - you're right” - Henry Ford. I seek to always be improving in all areas of my life, at home and work, on soft and hard skills.",
    icon: 'PresentationChartLine'
  }
]
