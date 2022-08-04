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

    dispatch({
      type: GET_TOKENS_DATA,
      tokensData: parsedTokensData
    })
  } catch (error: any) {
    console.error(error)
  }
}