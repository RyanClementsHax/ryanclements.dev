import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'

// man I'm really not sure how to clean this up lol
export const useHideAndShowWithScroll = (
  { enabled }: { enabled: boolean } = { enabled: true }
): ((ref: HTMLElement) => void) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ref) return
    const updateTranslationYTo = (translationY: number) => {
      ref.style.transform = `translateY(${translationY}px)`
    }
    if (!enabled) {
      updateTranslationYTo(0)
      return
    }
    let height: number | undefined
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        height = entries[0].borderBoxSize[0].blockSize
      }
    })
    observer.observe(ref)

    let previousY = window.scrollY
    let translationY = 0
    let updateTranslationYFrame: ReturnType<typeof requestAnimationFrame>
    const handler = () => {
      if (height === undefined) return
      cancelAnimationFrame(updateTranslationYFrame)

      const currentY = window.scrollY
      const diff = currentY - previousY
      translationY = Math.min(
        Math.max(
          translationY - diff,
          -(
            (
              height + 1
            ) /* sometimes chrome leaves in a pixel even though the math is right */
          )
        ),
        0
      )
      previousY = currentY

      updateTranslationYFrame = requestAnimationFrame(() => {
        updateTranslationYTo(translationY)
      })
    }

    window.addEventListener('scroll', handler)
    return () => {
      cancelAnimationFrame(updateTranslationYFrame)
      window.removeEventListener('scroll', handler)
      observer.disconnect()
    }
  }, [ref, enabled])

  return setRef
}
