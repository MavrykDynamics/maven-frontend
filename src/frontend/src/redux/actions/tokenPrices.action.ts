import { GET_TOKENS_PRICES } from './../action.types';

import CoinGecko from 'coingecko-api'

const coinGeckoClient = new CoinGecko()

export const getTokensPrices = () => async (dispatch: any, getState: any) => {
  try {
    const tokensInfoFromCoingecko = await coinGeckoClient.simple.price({ids: ['bitcoin','tezos','tzbtc'], vs_currencies: ['usd','eur']})
    
    dispatch({
      type: GET_TOKENS_PRICES,
      tokensPrices: tokensInfoFromCoingecko.data
    })
  } catch (error: any) {
    console.error(error)
  }
}