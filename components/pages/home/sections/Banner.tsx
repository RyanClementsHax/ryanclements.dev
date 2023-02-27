'use client'

import { useTheme, Theme } from 'components/theme'
import { A11yStaticImageData } from 'lib/content/images'
import Image from 'next/image'

export const Banner: React.FC<{
  srcMap: Record<Theme, A11yStaticImageData>
}> = ({ srcMap }) => {
  const { theme } = useTheme()
  if (!theme) return null
  const { alt, ...src } = srcMap[theme]
  return (
    <div className="relative hidden h-full w-full md:block">
      <Image src={src} alt={alt} priority fill />
    </div>
  )
}
