import c from 'classnames'

export interface TitleProps {
  children?: React.ReactNode
  className?: string
}

export const Title = ({ children, className }: TitleProps) => (
  <h2
    className={c(
      className,
      'font-bold uppercase tracking-wider text-center text-on-surface-offBase'
    )}
  >
    {children}
  </h2>
)
