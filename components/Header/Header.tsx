import { ThemeSelect } from 'components/theme'
import { useHideAndShowWithScroll } from 'lib/utils/useHideAndShowWithScroll'
import { useWindowScroll } from 'react-use'
import c from 'classnames'

export interface HeaderProps {
  fixed?: boolean
}

export const Header: React.FC<HeaderProps> = ({ fixed = false }) => {
  const isScrolledToTop = useIsScrolledToTop()
  const { contentRef, headerRef } = useHideAndShowWithScroll<
    HTMLElement,
    HTMLDivElement
  >({ enabled: !fixed })
  return (
    <header ref={headerRef} className={c({ 'fixed w-full': fixed })}>
      <div
        ref={contentRef}
        className={c(
          // some elements in the header might not render on first paint
          // which is why I specify a min height to prevent layout shift
          // min height needs to be tuned with the hight of what renders
          'flex min-h-[63px] justify-end border-b bg-surface-base p-3',
          isScrolledToTop
            ? 'border-transparent'
            : 'border-borderColor/75 bg-opacity-60 backdrop-blur-xl backdrop-filter'
        )}
      >
        <ThemeSelect />
      </div>
    </header>
  )
}

const useIsScrolledToTop = () => useWindowScroll().y === 0
