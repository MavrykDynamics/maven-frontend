export const LEGACY_NATIVE_TOKEN_SYMBOL = 'XTZ'
export const NATIVE_TOKEN_DISPLAY_SYMBOL = 'MVRK'

export const getTokenDisplayName = (tokenName: string): string =>
  tokenName === LEGACY_NATIVE_TOKEN_SYMBOL ? NATIVE_TOKEN_DISPLAY_SYMBOL : tokenName
