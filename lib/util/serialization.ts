export type Serializable<T> = T extends
  | string
  | number
  | boolean
  | undefined
  | null
  ? T
  : T extends Date
  ? string
  : unknown extends T
  ? unknown
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? never
  : T extends (infer U)[]
  ? Serializable<U>[]
  : T extends object
  ? {
      [Key in keyof T]: Serializable<T[Key]>
    }
  : never

// These are not very performant solutions

// consider upgrading to superjson if this gets complicated
// https://github.com/blitz-js/superjson#using-with-nextjs
export const serialize = <T>(obj: T): Serializable<T> => {
  if (
    typeof obj === 'number' ||
    typeof obj === 'string' ||
    typeof obj === 'boolean' ||
    obj === undefined ||
    obj === null
  ) {
    return obj as Serializable<T>
  } else if (obj instanceof Date) {
    return obj.toISOString() as Serializable<T>
  } else if (Array.isArray(obj)) {
    return obj.map(x => serialize(x)) as Serializable<T>
  } else if (typeof obj === 'object') {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: serialize(value) }),
      {}
    ) as Serializable<T>
  } else {
    throw new Error(`cannot serialize ${typeof obj}`)
  }
}

export const deserialize = <T>(obj: Serializable<T>): T => {
  if (
    typeof obj === 'number' ||
    typeof obj === 'boolean' ||
    obj === undefined ||
    obj === null
  ) {
    return obj as T
  } else if (Array.isArray(obj)) {
    return obj.map(x => deserialize(x)) as T
  } else if (typeof obj === 'object') {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: deserialize(value as Serializable<T>)
      }),
      {}
    ) as T
  } else if (typeof obj === 'string') {
    return (datePattern.test(obj) ? new Date(obj) : obj) as T
  } else {
    throw new Error(`cannot deserialize ${typeof obj}`)
  }
}

const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
