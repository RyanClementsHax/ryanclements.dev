import c from 'classnames'

export interface SubtitleProps {
  children?: React.ReactNode
  className?: string
}

export const Subtitle = ({ children, className }: SubtitleProps) => (
  <h3
    className={c(
      className,
      'text-center font-title text-3xl font-black text-on-surface-offBase'
    )}
  >
    {children}
  </h3>
)
