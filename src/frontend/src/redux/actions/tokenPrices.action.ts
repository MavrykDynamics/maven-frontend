import { GET_TOKENS_PRICES, GET_MAVRYK_HISTORY_PRICES } from './../action.types';

import CoinGecko from 'coingecko-api'
import axios from 'axios'

const coinGeckoClient = new CoinGecko()
const MAVRYK_COINGECKO_ID = 'mavryk-network'

export const getTokensPrices = () => async (dispatch: any, getState: any) => {
  try {
    const tokensInfoFromCoingecko = await coinGeckoClient.simple.price({
      ids: ['bitcoin', MAVRYK_COINGECKO_ID, 'tzbtc'],
      vs_currencies: ['usd', 'eur'],
    })
    const getTzBTCPrice = await getExchangeRateFromQuipu('KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn')
    tokensInfoFromCoingecko.data.mavryk = tokensInfoFromCoingecko.data[MAVRYK_COINGECKO_ID]
    delete tokensInfoFromCoingecko.data[MAVRYK_COINGECKO_ID]
    tokensInfoFromCoingecko.data.tzbtc = { usd: getTzBTCPrice, eur: undefined }

    dispatch({
      type: GET_TOKENS_PRICES,
      tokensPrices: tokensInfoFromCoingecko.data,
    })
  } catch (error: any) {
    console.error(error)
  }
}

export const getMavrykHistoryPrices = () => async (dispatch: any, getState: any) => {
  try {
    const response = await coinGeckoClient.coins.fetchMarketChart(MAVRYK_COINGECKO_ID, { vs_currency: 'usd', days: '1' });
    const { prices = [] } = response.data
  
    const mavryk = prices.length 
      ? prices.map((item) => {
          return {
            value: item[1],
            time: new Date (item[0]).getTime(),
          }
        })
      : []

    dispatch({
      type: GET_MAVRYK_HISTORY_PRICES,
      mavryk,
    })
  } catch (error: any) {
    console.error('getMavrykHistoryPrices', error)
  }
}

export async function getExchangeRateFromQuipu(contractAddress: string = ''): Promise<any> {
  return await axios.get(`https://api.templewallet.com/api/exchange-rates`).then((response: any) => {
    const tokenExchangeRate = response.data.filter((item: any) => item.tokenAddress === contractAddress)
    return tokenExchangeRate[0].exchangeRate
  })
}
