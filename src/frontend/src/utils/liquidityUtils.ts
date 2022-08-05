export const calculateLqtOutput = ({
  lqTokens,
  xtzPool,
  tzbtcPool,
  lqtTotal
}: {
  lqTokens: number;
  xtzPool: number;
  tzbtcPool: number;
  lqtTotal: number;
}): { xtz: number; tzbtc: number } => {
    const xtzOut = (+lqTokens * (xtzPool)) / lqtTotal
    const tzbtcOut = (+lqTokens * (tzbtcPool)) / lqtTotal

    return {
        xtz: xtzOut,
        tzbtc: tzbtcOut
    };
};