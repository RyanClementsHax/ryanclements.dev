import { useReactFromHast } from 'lib/util/parsing/client'
import { HastTree } from 'lib/util/parsing/types'

export const Content: React.FC<{ root: HastTree }> = ({ root }) => {
  const children = useReactFromHast(root)
  return <div>{children}</div>
}
