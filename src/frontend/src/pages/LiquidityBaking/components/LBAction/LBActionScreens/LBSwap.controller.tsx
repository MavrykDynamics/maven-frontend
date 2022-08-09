import React, { useState } from 'react'

import { cyanColor } from 'styles'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'
import { Button } from 'app/App.components/Button/Button.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { LBActionBottomWrapper } from 'app/App.components/LBActionBottomWrapper/LBActionBottomWrapper.controller'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { xtzToTokenTokenOutput, swapCalculateCoinReceive, tokenToXtzXtzOutput } from 'utils/swapUtils'
import { TezosToolkit } from '@taquito/taquito'
import { ENVIRONMENT } from 'utils/consts'

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

  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>({
    from: 'XTZ',
    to: 'tzBTC',
  })
  const [inputValues, setInputValues] = useState({
    XTZ: 0,
    tzBTC: 0,
  })

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const receiveInputValue = swapCalculateCoinReceive(isRevertedCoins.from, isRevertedCoins.to, Number(value), {
      xtzPool: xtz_pool,
      tokenPool: token_pool,
    })

    setInputValues({
      ...inputValues,
      [isRevertedCoins.to]: receiveInputValue?.toFixed(5),
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

    console.log('lbContract', lbContract, Tezos)

    // if XTZ => tzBTC perform %xtzToToken
    if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
      const minTokensBought = xtzToTokenTokenOutput(dataObject)?.toNumber()

      const op = await lbContract.methods.xtzToToken(accountPkh, minTokensBought, deadline)
      // @ts-ignore
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
          useMaxHandler={() => {}}
          userBalance={87}
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
          useMaxHandler={() => {}}
          userBalance={87}
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

      <LBActionBottomWrapper
        onClickHandler={(value: unknown) => setSeletedToggle(value as number)}
        selectedToogle={selectedToogle}
        priceImpact={0}
        minimumLBTRecived={0}
      />
    </ActionScreenWrapper>
  )
}
