import { fetchFromIndexer } from "gql/gql.heplers"
import { USER_INFO_QUERY, USER_INFO_QUERY_NAME, USER_INFO_QUERY_VARIABLES } from "gql/queries/user.query"
import { GET_USER_DATA } from "redux/action.types"
import { UserData } from "utils/interfaces"
import { calcWithoutPrecision } from "utils/utils"



export const getUserData = (accountPkh: string) => async (dispatch: any, getState: any) => {
  try {
    const userInfoFromIndexer = await fetchFromIndexer(
      USER_INFO_QUERY,
      USER_INFO_QUERY_NAME,
      USER_INFO_QUERY_VARIABLES(accountPkh),
    )
    
    const userInfoData = userInfoFromIndexer?.mavryk_user[0]
    const userIsDelegatedToSatellite = userInfoData?.delegation_records.length > 0
    const userInfo: UserData = {
      myAddress: userInfoData?.address,
      myMvkTokenBalance: calcWithoutPrecision(userInfoData?.mvk_balance),
      mySMvkTokenBalance: calcWithoutPrecision(userInfoData?.smvk_balance),
      participationFeesPerShare: calcWithoutPrecision(userInfoData?.participation_fees_per_share),
      satelliteMvkIsDelegatedTo: userIsDelegatedToSatellite
        ? userInfoData?.delegation_records[0].satellite_record?.user_id
        : '',
    }

    dispatch({
      type: GET_USER_DATA,
      userData: userInfo,
    })
  } catch (error: any) {
    console.error(error)
    dispatch({
      type: GET_USER_DATA,
      userData: {},
    })
  }
}