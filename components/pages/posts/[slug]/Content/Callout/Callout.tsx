import c from 'classnames'
import s from './Callout.module.scss'

const classToIconMap: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  danger: '🚫'
}

export const Callout: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <aside {...props} className={c(props.className, s.callout)}>
    <span className="hidden text-3xl md:block">
      {getIconFromClassName(props.className)}
    </span>
    <div className={s.content}>{children}</div>
  </aside>
)

const getIconFromClassName = (className?: string): string =>
  (className ? classToIconMap[className] : undefined) ?? classToIconMap['info']
