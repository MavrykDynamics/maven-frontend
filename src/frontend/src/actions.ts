import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import { fetchFromIndexer } from "utils/gql.heplers";
import { State, UserData } from "utils/interfaces";
import { calcWithoutPrecision } from "utils/utils";

export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARKTHEME,
});

export const SCROLL = "SCROLL";

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition
});

export const CONNECT = 'CONNECT'
export const connectWalletAction = (tzs: TezosToolkit | undefined, accountPkh?: string) => ({
  type: CONNECT,
  tezos: tzs,
  ready: Boolean(tzs),
  accountPkh: accountPkh,
})

export const SET_WALLET = 'SET_WALLET'
export const setWalletAction = (wallet: TempleWallet) => ({
  type: SET_WALLET,
  wallet,
})

export const USER_INFO_QUERY = `
query GetUserInfo ($_eq: String = "") {
  mavryk_user(where: {address: {_eq: $_eq}}) {
    address
    mvk_balance
    smvk_balance
    delegation_records {
      satellite_record {
        user_id
      }
    }
  }
}
`

export const USER_INFO_QUERY_NAME = 'GetUserInfo'
export function USER_INFO_QUERY_VARIABLES(address: string): Record<string, any> {
  /* prettier-ignore */
  return { _eq: address }
}


export const GET_USER_DATA = 'GET_USER_DATA'
export const SET_USER_DATA = 'SET_USER_DATA'
export const getUserData = async (accountPkh: string) => {
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
    return {
      type: GET_USER_DATA,
      userData: userInfo,
    }
  } catch (error: any) {
    console.error(error)
    return {
      type: GET_USER_DATA,
      userData: {},
    }
  }
}