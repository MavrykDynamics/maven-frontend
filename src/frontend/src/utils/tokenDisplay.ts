export const LEGACY_NATIVE_TOKEN_SYMBOL = 'XTZ'
export const NATIVE_TOKEN_DISPLAY_SYMBOL = 'MVRK'
export const WRAPPED_BTC_DISPLAY_SYMBOL = 'wBTC'

const TOKEN_DISPLAY_NAMES: Record<string, string> = {
  [LEGACY_NATIVE_TOKEN_SYMBOL]: NATIVE_TOKEN_DISPLAY_SYMBOL,
  tzBTC: WRAPPED_BTC_DISPLAY_SYMBOL,
  tzBTZ: WRAPPED_BTC_DISPLAY_SYMBOL,
}

export const getTokenDisplayName = (tokenName: string): string => TOKEN_DISPLAY_NAMES[tokenName] ?? tokenName
