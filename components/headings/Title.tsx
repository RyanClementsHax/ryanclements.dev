import c from 'classnames'

export interface TitleProps {
  children?: React.ReactNode
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h2
    className={c(
      className,
      'text-center font-bold uppercase tracking-wider text-on-surface-offBase'
    )}
  >
    {children}
  </h2>
)
