import { ThemeSelect } from 'components/theme'
import { useHideAndShowWithScroll } from 'lib/util/useHideAndShowWithScroll'
import { useWindowScroll } from 'react-use'
import c from 'classnames'

export interface HeaderProps {
  fixed?: boolean
  hideWithScroll?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  hideWithScroll = false,
  fixed = false
}) => {
  const isScrolledToTop = useIsScrolledToTop()
  const nodeRef = useHideAndShowWithScroll({ enabled: hideWithScroll })
  return (
    <header
      ref={nodeRef}
      className={c(
        // some elements in the header might not render on first paint
        // which is why I specify a min height to prevent layout shift
        // min height needs to be tuned with the hight of what renders
        'top-0 z-10 flex min-h-[63px] justify-end border-b bg-surface-base p-3',
        isScrolledToTop
          ? 'border-transparent'
          : 'border-borderColor/75 bg-opacity-60 backdrop-blur-xl backdrop-filter',
        fixed ? 'fixed w-full' : 'sticky'
      )}
    >
      <ThemeSelect />
    </header>
  )
}

const useIsScrolledToTop = () => useWindowScroll().y === 0
