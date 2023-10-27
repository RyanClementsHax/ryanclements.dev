import { ElementSubstitution } from 'lib/pages/posts/[slug]/client'
import s from './Code.module.scss'
import c from 'classnames'

export const Code: ElementSubstitution<'code'> = props => {
  return <code {...props} className={c(s.code, props.className)} />
}
