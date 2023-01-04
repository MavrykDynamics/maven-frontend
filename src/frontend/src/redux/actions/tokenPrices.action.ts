import { GET_TOKENS_PRICES, GET_TEZOS_HISTORY_PRICES } from './../action.types';

import CoinGecko from 'coingecko-api'
import axios from 'axios'

const coinGeckoClient = new CoinGecko()

export const getTokensPrices = () => async (dispatch: any, getState: any) => {
  try {
    const tokensInfoFromCoingecko = await coinGeckoClient.simple.price({
      ids: ['bitcoin', 'tezos', 'tzbtc'],
      vs_currencies: ['usd', 'eur'],
    })
    const getTzBTCPrice = await getExchangeRateFromQuipu('KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn')
    tokensInfoFromCoingecko.data.tzbtc = { usd: getTzBTCPrice, eur: undefined }

    dispatch({
      type: GET_TOKENS_PRICES,
      tokensPrices: tokensInfoFromCoingecko.data,
    })
  } catch (error: any) {
    console.error(error)
  }
}

export const getTezosHistoryPrices = () => async (dispatch: any, getState: any) => {
  try {
    const response = await coinGeckoClient.coins.fetchMarketChart('tezos', { vs_currency: 'usd', days: '1' });
    const { prices = [] } = response.data
  
    const tezos = prices.length 
      ? prices.map((item) => {
          return {
            value: item[1],
            time: new Date (item[0]).getTime(),
          }
        })
      : []

    dispatch({
      type: GET_TEZOS_HISTORY_PRICES,
      tezos,
    })
  } catch (error: any) {
    console.error('getTezosHistoryPrices', error)
  }
}

export async function getExchangeRateFromQuipu(contractAddress: string = ''): Promise<any> {
  return await axios.get(`https://api.templewallet.com/api/exchange-rates`).then((response: any) => {
    const tokenExchangeRate = response.data.filter((item: any) => item.tokenAddress === contractAddress)
    return tokenExchangeRate[0].exchangeRate
  })
}
