import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import c from 'classnames'
import { useTheme } from 'components/theme/ThemeContext'
import { Theme } from 'components/theme/types'

const Button: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 bg-surface-base overflow-hidden text-left border border-borderColor rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-ringColor-focus focus:border-borderColor-focus sm:text-sm">
      <span className="block truncate text-on-surface-base">{theme}</span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon className="w-5 h-5 text-icon" aria-hidden="true" />
      </span>
    </Listbox.Button>
  )
}

const Option: React.FC<{ value: string }> = ({ value }) => (
  <Listbox.Option
    className={({ active }) =>
      c(
        active
          ? 'text-on-surface-active bg-surface-active'
          : 'text-on-surface-base',
        'cursor-default select-none relative py-2 pl-10 pr-4'
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
          <span className="text-primary absolute inset-y-0 left-0 flex items-center pl-3">
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </Listbox.Option>
)

export const ThemeSelect: React.FC = () => {
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
            <Listbox.Options className="absolute w-full py-1 mt-1 z-10 overflow-auto text-base bg-surface-base rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
