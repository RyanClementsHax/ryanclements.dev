import React, { RefObject, useEffect, useRef } from 'react'

export const useHideAndShowWithScroll = <
  THeader extends HTMLElement,
  TContent extends HTMLElement
>({
  enabled
}: {
  enabled: boolean
}): {
  headerRef: RefObject<THeader>
  contentRef: RefObject<TContent>
} => {
  const headerRef = useRef<THeader | null>(null)
  const contentRef = useRef<TContent | null>(null)

  useEffect(() => {
    const updater = new StyleUpdater(headerRef, contentRef)
    if (enabled) {
      updater.register()
      return () => updater.dispose()
    } else {
      updater.reset()
      return
    }
  }, [enabled])

  return {
    headerRef,
    contentRef
  }
}

class StyleUpdater<THeader extends HTMLElement, TContent extends HTMLElement> {
  private readonly HEADER_STYLES: React.CSSProperties = {
    height: '',
    marginBottom: ''
  }
  private readonly CONTENT_STYLES: React.CSSProperties = {
    position: 'sticky',
    top: 0
  }

  private frame: ReturnType<typeof requestAnimationFrame> = -1

  constructor(
    private readonly headerRef: RefObject<THeader>,
    private readonly contentRef: RefObject<TContent>
  ) {}

  public register() {
    this.setupStyles()
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  public dispose() {
    cancelAnimationFrame(this.frame)
    window.removeEventListener('scroll', this.handleScroll)
  }

  public reset() {
    this.cleanupStyles()
  }

  private handleScroll = () => {
    cancelAnimationFrame(this.frame)
    this.frame = requestAnimationFrame(() => this.update())
  }

  private update() {
    if (!this.contentRef.current) return

    const { top, height } = this.contentRef.current.getBoundingClientRect()
    const scrollY = this.clamp(
      window.scrollY,
      0,
      document.body.scrollHeight - window.innerHeight
    )

    if (top + height < 0) {
      const offset = Math.max(height, scrollY)
      this.setHeaderHeight(offset)
      this.setHeaderMarginBottom(height - offset)
    } else if (top === 0) {
      this.setHeaderHeight(scrollY + height)
      this.setHeaderMarginBottom(-scrollY)
    }
  }

  private setupStyles() {
    this.assignStyles(this.headerRef, this.HEADER_STYLES)
    this.assignStyles(this.contentRef, this.CONTENT_STYLES)
  }

  private cleanupStyles() {
    this.removeStyles(this.headerRef, this.HEADER_STYLES)
    this.removeStyles(this.contentRef, this.CONTENT_STYLES)
  }

  private assignStyles(
    ref: RefObject<HTMLElement>,
    styles: React.CSSProperties
  ) {
    if (ref.current) {
      Object.assign(ref.current.style, styles)
    }
  }

  private removeStyles(
    ref: RefObject<HTMLElement>,
    styles: React.CSSProperties
  ) {
    if (ref.current) {
      Object.assign(
        ref.current.style,
        Object.entries(styles)
          .map(([key]) => [key, ''])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      )
    }
  }

  private setHeaderHeight(height: number) {
    this.setHeaderProperty('height', `${height}px`)
  }

  private setHeaderMarginBottom(marginBottom: number) {
    this.setHeaderProperty('margin-bottom', `${marginBottom}px`)
  }

  private setHeaderProperty(property: string, value: string) {
    this.headerRef.current?.style.setProperty(property, value)
  }

  private clamp(number: number, a: number, b: number) {
    const min = Math.min(a, b)
    const max = Math.max(a, b)
    return Math.min(Math.max(number, min), max)
  }
}
