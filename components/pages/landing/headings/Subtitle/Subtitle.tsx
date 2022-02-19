import c from 'classnames'

export interface SubtitleProps {
  children?: React.ReactNode
  className?: string
}

export const Subtitle = ({ children, className }: SubtitleProps) => (
  <h3
    className={c(
      className,
      'font-title font-black text-3xl text-center text-on-surface-offBase'
    )}
  >
    {children}
  </h3>
)
