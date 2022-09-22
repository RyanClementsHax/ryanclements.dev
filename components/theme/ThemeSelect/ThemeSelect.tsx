import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import c from 'classnames'
import { useTheme } from 'components/theme/ThemeContext'
import { Theme } from 'components/theme/types'

const Button = () => {
  const { theme } = useTheme()
  return (
    <Listbox.Button className="relative w-full cursor-pointer overflow-hidden rounded-md border border-borderColor bg-surface-base py-2 pl-3 pr-10 text-left shadow-sm focus:border-borderColor-focus focus:outline-none focus:ring-1 focus:ring-ringColor-focus sm:text-sm">
      <span className="block truncate text-on-surface-base">{theme}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <ChevronUpDownIcon className="h-5 w-5 text-icon" aria-hidden="true" />
      </span>
    </Listbox.Button>
  )
}

const Option = ({ value }: { value: string }) => (
  <Listbox.Option
    className={({ active }) =>
      c(
        active
          ? 'bg-surface-active text-on-surface-active'
          : 'text-on-surface-base',
        'relative cursor-pointer select-none py-2 pl-10 pr-4'
      )
    }
    value={value}
  >
    {({ selected }) => (
      <>
        <span
          className={c(
            selected ? 'font-medium' : 'font-normal',
            'block truncate'
          )}
        >
          {value}
        </span>
        {selected && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </Listbox.Option>
)

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  return (
    <div className="w-28">
      <Listbox value={theme} onChange={setTheme}>
        <div className="relative">
          <Button />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-surface-base-elevation-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.keys(Theme).map(x => (
                <Option key={x} value={x} />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
