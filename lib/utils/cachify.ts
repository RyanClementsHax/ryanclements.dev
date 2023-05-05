import { cache } from 'react'

export type OnlyFuncs<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
}

export const cachify = <T extends object>(
  obj: T,
  keys: (keyof OnlyFuncs<T>)[]
): T => {
  const overrides = Object.fromEntries(
    keys
      .filter(key => obj[key] instanceof Function)
      .map(key => [
        key,
        cache((obj[key] as (...args: unknown[]) => unknown).bind(obj))
      ])
  )
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop in overrides && typeof prop === 'string') {
        return overrides[prop]
      }

      const value = Reflect.get(target, prop, receiver)
      if (value instanceof Function) {
        return function (this: unknown, ...args: unknown[]) {
          return value.apply(this === receiver ? target : this, args)
        }
      }
      return value
    }
  })
}
