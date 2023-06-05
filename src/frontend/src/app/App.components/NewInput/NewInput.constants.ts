export const INPUT_PRIMARY = 'primary'
export const INPUT_SEARCH = 'search'
export const INPUT_STATUS_SUCCESS = 'success'
export const INPUT_STATUS_ERROR = 'error'
export const INPUT_STATUS_DEFAULT = ''

export const INPUT_MEDIUM = 'medium-input'
export const INPUT_SMALL = 'small-input'
export const INPUT_LARGE = 'large-input'
export const INPUT_BIG = 'big-input'

export type InputSizeType = typeof INPUT_SMALL | typeof INPUT_MEDIUM | typeof INPUT_LARGE | typeof INPUT_BIG
export type InputStatusType =
  | typeof INPUT_STATUS_SUCCESS
  | typeof INPUT_STATUS_ERROR
  | typeof INPUT_STATUS_DEFAULT
  | ''
  | undefined
export type InputKind = typeof INPUT_PRIMARY | typeof INPUT_SEARCH
