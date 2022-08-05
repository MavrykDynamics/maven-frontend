import { fetchFromIndexer } from "gql/gql.heplers"
import { TOKEN_QUERY, TOKEN_QUERY_NAME } from "gql/queries/token.query"
import { GET_TOKENS_DATA } from "redux/action.types"


export const getTokensData = () => async (dispatch: any, getState: any) => {
  try {
    const tokensInfoFromIndexer = await fetchFromIndexer(
      TOKEN_QUERY,
      TOKEN_QUERY_NAME,
      {}
    )

    const parsedTokensData = tokensInfoFromIndexer.liquidity_baking[0]
    parsedTokensData['token_pool'] = parsedTokensData['token_pool'] / (10**parsedTokensData['token_decimals'])
    parsedTokensData['xtz_pool'] = parsedTokensData['xtz_pool'] / (10**parsedTokensData['xtz_decimals'])

    dispatch({
      type: GET_TOKENS_DATA,
      tokensData: parsedTokensData
    })
  } catch (error: any) {
    console.error(error)
  }
}