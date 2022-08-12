export const SLIPPAGE_TOGGLE_VALUES = [{title: '0.5%', value: 0.5}, {title: '1%', value: 1}, {title: '3%', value: 3}, {title: 'custom%', value: -1}]


export type DEXType = {
  fee: number;
  burn: number;
  includeSubsidy: boolean;
}

export const getSettings = (dex: string): DEXType => {
  switch (dex) {
    case 'liquidity':
      return { fee: 0.1, burn: 0.1, includeSubsidy: false };
    case 'swap':
      return { fee: 0.3, burn: 0, includeSubsidy: false };
    default:
      return { fee: 0.3, burn: 0, includeSubsidy: false };
  }
}