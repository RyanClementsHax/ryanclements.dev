import s from './Code.module.scss'
import c from 'classnames'

export const Code: React.FC<React.HTMLAttributes<HTMLElement>> = props => (
  <code {...props} className={c(s.code, props.className)} />
)
