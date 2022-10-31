import { GET_TOKENS_PRICES } from './../action.types';

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

export async function getExchangeRateFromQuipu(contractAddress: string = ''): Promise<any> {
  return await axios.get(`https://api.templewallet.com/api/exchange-rates`).then((response: any) => {
    const tokenExchangeRate = response.data.filter((item: any) => item.tokenAddress === contractAddress)
    return tokenExchangeRate[0].exchangeRate
  })
}
