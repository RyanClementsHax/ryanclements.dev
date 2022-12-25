import { ThemeSelect } from 'components/theme'
import { useHideAndShowWithScroll } from 'lib/util/useHideAndShowWithScroll'

export interface HeaderProps {
  backgroundType?: 'ghostAtTop' | 'normal'
}

export const Header: React.FC<HeaderProps> = ({
  backgroundType = 'normal'
}) => {
  const Wrapper = backgroundTypeToWrapperMap[backgroundType]
  return (
    <Wrapper>
      <ThemeSelect />
    </Wrapper>
  )
}

const GhostAtTopWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <header className="absolute flex w-full justify-end p-3">{children}</header>
)

const NormalWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const nodeRef = useHideAndShowWithScroll()
  return (
    <header
      ref={nodeRef}
      className="sticky top-0 z-10 flex justify-end bg-surface-base p-3"
    >
      {children}
    </header>
  )
}

const backgroundTypeToWrapperMap: Record<
  NonNullable<HeaderProps['backgroundType']>,
  React.FC<{ children?: React.ReactNode }>
> = {
  ghostAtTop: GhostAtTopWrapper,
  normal: NormalWrapper
}
