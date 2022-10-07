import { FaqItem, LBFAQStyled } from './FAQ.style'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

const LBFAQ = () => {
  return (
    <LBFAQStyled>
      <FaqItem>
        <CustomizedText fontSize={25} fontWidth={700} color={'#8D86EB'} className="title">
          What is Liquidity Baking?
        </CustomizedText>
        <CustomizedText lineHeight={27}>
          Liquidity baking (LB) is a protocol level DeFi feature of the Tezos blockchain. LB is a stand-alone DEX which
          features a trading pair between XTZ/tzBTC (wrapped Bitcoin), and incentivized directly by the Tezos protocol.
          By providing liquidity to the DEX, you earn newly minted XTZ as yield, along with trading fees.
        </CustomizedText>
      </FaqItem>

      <FaqItem>
        <CustomizedText fontSize={25} fontWidth={700} color={'#8D86EB'} className="title">
          Where are the rewards from? Is it sustainable?
        </CustomizedText>
        <CustomizedText lineHeight={27}>
          Tezos is a Proof of Stake protocol which features an annual inflation rate to reward securing the network
          (5.5%) and incentivizing liquidity baking (0.3%), for a total of 5.8%. Liquidity baking provides a sustainable
          yield model, where 2.5 XTZ is minted every block (30 seconds), and deposited into the DEX to incentivize
          liquidity providers. The DEX has a trading fee of 0.2% per transaction, where half of the fee goes to
          liquidity providers, and the other half is burned.
        </CustomizedText>
      </FaqItem>

      <FaqItem last>
        <CustomizedText fontSize={25} fontWidth={700} color={'#8D86EB'} className="title">
          Where can I read more about liquidity baking?
        </CustomizedText>
        <a href="/" target="_blank">
          <CustomizedText color="#86D4C9" link>
            Great article by Tezos Commons & Arthur Breitman
          </CustomizedText>
        </a>
        <a href="/" target="_blank">
          <CustomizedText color="#86D4C9" link>
            Liquidity Baking documentation
          </CustomizedText>
        </a>
      </FaqItem>
    </LBFAQStyled>
  )
}

export default LBFAQ
