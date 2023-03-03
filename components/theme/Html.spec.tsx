import { render, screen } from '@testing-library/react'
import { Html } from './Html'
import { Theme } from './types'

const TEST_ID = 'html'

describe('Html', () => {
  let undoConsoleErrorStub: () => void

  beforeEach(async () => {
    document.documentElement.className = Theme.dark
    undoConsoleErrorStub = ignoreValidateDOMNestingError()
  })

  afterEach(() => {
    undoConsoleErrorStub()
  })

  it('with a class already on the document element renders the className with the intial theme last', async () => {
    const otherClass = 'otherClass'
    render(<Html data-testid={TEST_ID} className={otherClass} />)

    // eslint-disable-next-line jest-dom/prefer-to-have-class
    expect((await screen.findByTestId(TEST_ID)).className).toBe(
      `${otherClass} ${Theme.dark}`
    )
  })

  it('renders the className with the intial theme last', async () => {
    render(<Html data-testid={TEST_ID} />)

    expect(await screen.findByTestId(TEST_ID)).toHaveClass(Theme.dark)
  })
})

/* eslint-disable no-console */
const ignoreValidateDOMNestingError = () => {
  const originalErrorFn = console.error

  console.error = ((...args) => {
    if (!/validateDOMNesting/i.test(args?.[0])) {
      originalErrorFn(...args)
    }
  }) as typeof console.error

  return () => {
    console.error = originalErrorFn
  }
}
/* eslint-enable no-console */
