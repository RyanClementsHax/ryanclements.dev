import { useReactFromHast } from 'lib/util/markdown/client'
import { HastTree } from 'lib/util/markdown/types'
import { ComponentsWithoutNodeOptions } from 'rehype-react/lib/complex-types'

const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => (
  <h2 {...props} className="text-red-500" />
)

const components: ComponentsWithoutNodeOptions['components'] = {
  h2: H2
}

export const Content: React.FC<{ root: HastTree }> = ({ root }) => {
  const children = useReactFromHast(root, components)
  return <div>{children}</div>
}
