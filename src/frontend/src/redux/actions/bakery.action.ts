import { TezosOperationType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'

// helpers
import type { AppDispatch, GetState } from '../../app/App.controller'
import { ROCKET_LOADER } from 'utils/consts'
import { ERROR, INFO, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { GET_BAKERY_DELEGATES } from 'redux/action.types'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { toggleLoader } from './preferences.action'
import { getFreeSpace } from 'pages/Bakery/Bakery.helpers'

// data
import { delegateCardData } from 'pages/Bakery/BakeryData'

// actions
import { checkIfWalletIsConnected, WalletOptions } from './connectWallet.actions'

// types
import { State } from 'utils/interfaces'

export type BakeryDelegateDataType = {
  balance: number
  delegatedBalance: number
}

export const getBakeryDelegateData = async (bakerAddress: string): Promise<BakeryDelegateDataType> => {
  try {
    const response = await fetch(`https://api.tzkt.io/v1/delegates/${bakerAddress}`)
    const result = await response.json()

    return result
  } catch {
    return {
      balance: -1,
      delegatedBalance: -1,
    }
  }
}

type AccountType = {
  delegate: {
    address: string | null
  }
}

export const getAccountByAddress = async (bakerAddress: string): Promise<AccountType> => {
  try {
    const response = await fetch(`https://api.tzkt.io/v1/accounts/${bakerAddress}`)
    const result = await response.json()

    return result
  } catch {
    return {
      delegate: {
        address: null
      }
    }
  }
}
 
export const getDelegates = () => async (dispatch: AppDispatch, getState: GetState) => {
  const state: State = getState()
  const { accountPkh } = state.wallet

  try {
    const values = accountPkh 
    ? await Promise.all([
      getBakeryDelegateData(delegateCardData[0].tzAddress),
      getBakeryDelegateData(delegateCardData[1].tzAddress),
      getAccountByAddress(accountPkh)
    ])
    : await Promise.all([
      getBakeryDelegateData(delegateCardData[0].tzAddress),
      getBakeryDelegateData(delegateCardData[1].tzAddress),
    ])
    
    const availableXtzSpaces = values.slice(0, 2) as BakeryDelegateDataType[]
    const account = values.slice(2)[0] as AccountType

    const delegates = delegateCardData.map((item, index) => {
      if (!accountPkh) {
        return {
          ...item,
          availableXtzSpace: getFreeSpace(availableXtzSpaces[index]),
        }
      }

      return {
        ...item,
        availableXtzSpace: getFreeSpace(availableXtzSpaces[index]),
        delegateAddress: account.delegate.address
      }
    })

    dispatch({
      type: GET_BAKERY_DELEGATES,
      delegates,
    })
  } catch (error) {
    console.log('getDelegates', error);
  }
}

export const delegation = (bakerAddress: string) => async (dispatch: AppDispatch, getState: GetState) => {
  const state: State = getState()
  const { accountPkh = '' } = state.wallet

  if (!state.wallet.ready) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  try {
    const wallet = new BeaconWallet(WalletOptions)
    const walletResponse = await checkIfWalletIsConnected(wallet)

    if (walletResponse) {
      await wallet.client.requestOperation({
        operationDetails: [
          {
            kind: TezosOperationType.DELEGATION,
            delegate: bakerAddress,
          },
        ],
      })

      await dispatch(toggleLoader(ROCKET_LOADER))
      await dispatch(showToaster(INFO, 'Delegation', 'Please wait 30s...'))

      // TODO: find a better way to do this
      let count = 0
      const checkConfirmartion = () => {
        setTimeout(async () => {
          count++
          const accountData = await getAccountByAddress(accountPkh)

          if (count > 4) {
            await dispatch(toggleLoader())
            dispatch(showToaster(ERROR, 'Error', 'Delegation data not updated'))
            return
          }

          if (accountData.delegate.address !== bakerAddress) {
            checkConfirmartion()
            return
          }

          await dispatch(getDelegates)
          await dispatch(toggleLoader())
          await dispatch(showToaster(SUCCESS, 'Successful delegation', 'All good :)'))
        }, 10000)
      }

      checkConfirmartion()
    }
  } catch (error: any) {
    console.error(`Failed delegation:`, error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch(toggleLoader())
  }
}
