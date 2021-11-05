import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import c from 'classnames'
import { useTheme } from './ThemeContext'
import { Theme } from './types'

export const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  return (
    <div className="w-24">
      <Listbox value={theme} onChange={setTheme}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
            <span className="block truncate text-on-surface">{theme}</span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 z-10 overflow-auto text-base bg-surface rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.keys(Theme).map(x => (
                <Listbox.Option
                  key={x}
                  className={({ active }) =>
                    c(
                      active
                        ? 'text-primary-900 bg-primary-100'
                        : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-10 pr-4'
                    )
                  }
                  value={x}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={c(
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {x}
                      </span>
                      {selected && (
                        <span className="text-primary-600 absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
