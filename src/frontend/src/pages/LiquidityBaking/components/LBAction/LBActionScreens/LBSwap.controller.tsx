import React, { useState } from 'react'

import { cyanColor } from 'styles'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'
import { Button } from 'app/App.components/Button/Button.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import {
  xtzToTokenTokenOutput,
  swapCalculateCoinReceive,
  tokenToXtzXtzOutput,
} from 'pages/LiquidityBaking/components/LBAction/helpers/swapUtils'
import { TezosToolkit } from '@taquito/taquito'
import { ENVIRONMENT } from 'utils/consts'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'

type CoinsOrderType = {
  from: 'XTZ' | 'tzBTC'
  to: 'tzBTC' | 'XTZ'
}

export const LBSwap = ({ ready }: { ready: boolean }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>({
    from: 'XTZ',
    to: 'tzBTC',
  })
  const [inputValues, setInputValues] = useState({
    XTZ: 0,
    tzBTC: 0,
  })

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: number | string } },
  ) => {
    const { name, value = 0 } = e.target

    const receiveInputValue = swapCalculateCoinReceive(isRevertedCoins.from, isRevertedCoins.to, Number(value), {
      xtzPool: xtz_pool,
      tokenPool: token_pool,
    })

    setInputValues({
      ...inputValues,
      [isRevertedCoins.to]: receiveInputValue?.toFixed(5) || 0,
      [name]: value,
    })
  }

  const swapBtnHandler = async () => {
    // init data we need to perform swap
    const Tezos = new TezosToolkit(ENVIRONMENT.rpcLink)
    const lbContract = await Tezos.wallet.at(address)
    const deadline = new Date(Date.now() + 60000).toISOString()
    const dataObject = {
      xtzPool: xtz_pool,
      tokenPool: token_pool,
      xtzIn: inputValues.XTZ,
      tokenIn: inputValues.tzBTC,
    }

    // if XTZ => tzBTC perform %xtzToToken
    if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
      const minTokensBought = xtzToTokenTokenOutput(dataObject)?.toNumber()

      const op = await lbContract.methods.xtzToToken(accountPkh, minTokensBought, deadline).send()

      await op.confirmation()
    }

    // if tzBTC => XTZ perform %tokenToXtz
    if (isRevertedCoins.from === 'tzBTC' && isRevertedCoins.to === 'XTZ') {
      const tzBtcContract = await Tezos.wallet.at(token_address)
      const minXtzBought = tokenToXtzXtzOutput(dataObject)?.toNumber()

      const batch = Tezos.wallet
        .batch()
        .withContractCall(tzBtcContract.methods.approve(address, 0))
        .withContractCall(tzBtcContract.methods.approve(address, inputValues.tzBTC))
        .withContractCall(lbContract.methods.tokenToXtz(accountPkh, inputValues.tzBTC, minXtzBought, deadline))
      const batchOp = await batch.send()
      await batchOp.confirmation()
    }

    setInputValues({
      XTZ: 0,
      tzBTC: 0,
    })
  }

  return (
    <ActionScreenWrapper className="swap">
      <div className={`exchange-block ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <CustomizedText>XTZ</CustomizedText>

        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>
        <CustomizedText>tzBTC</CustomizedText>
      </div>

      <div className={`input-wrapper ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <Input
          placeholder={'0'}
          name="XTZ"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.XTZ}
          convertedValue={inputValues.XTZ * coinPrices.tezos.usd}
          icon={'XTZ_tezos'}
          pinnedText={'XTZ'}
          useMaxHandler={() => {
            setIsRevertedCoins({
              from: 'XTZ',
              to: 'tzBTC',
            })

            const receiveInputValue = swapCalculateCoinReceive('XTZ', 'tzBTC', Number(xtzBalance), {
              xtzPool: xtz_pool,
              tokenPool: token_pool,
            })?.toFixed(5)

            setInputValues({
              ...inputValues,
              tzBTC: parseFloat(receiveInputValue || '') || 0,
              XTZ: xtzBalance,
            })
          }}
          userBalance={xtzBalance}
        />

        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>

        <Input
          placeholder={'0'}
          name="tzBTC"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={inputValues.tzBTC * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => {
            setIsRevertedCoins({
              from: 'tzBTC',
              to: 'XTZ',
            })

            const receiveInputValue = swapCalculateCoinReceive('tzBTC', 'XTZ', Number(tzBTCBalance), {
              xtzPool: xtz_pool,
              tokenPool: token_pool,
            })

            setInputValues({
              ...inputValues,
              XTZ: parseFloat(receiveInputValue?.toFixed(5) || '') || 0,
              tzBTC: tzBTCBalance,
            })
          }}
          userBalance={tzBTCBalance}
        />
      </div>

      {ready ? (
        <Button text={'Swap'} icon={'swapBtnIcon'} onClick={swapBtnHandler} className="swap_btn" kind={PRIMARY} />
      ) : (
        <ConnectWallet className="swap-action" />
      )}

      <VertInfo>
        <CustomizedText fontWidth={500}>Exchange Rate</CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText="$" value={coinPrices.tezos.usd} /> ) = &nbsp;
          <CommaNumber
            value={coinPrices.tezos.usd / coinPrices.tzbtc.usd}
            showDecimal
            decimalsToShow={8}
            endingText="tzBTC"
          />
        </CustomizedText>
      </VertInfo>

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived minimumRecived={[{ value: inputValues[isRevertedCoins.to], tokenName: isRevertedCoins.to }]} />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
