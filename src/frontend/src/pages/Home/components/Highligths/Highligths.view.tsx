import * as React from 'react'
import { useState } from 'react'

// prettier-ignore
import { HighligthsContainer, HighligthsContent, HighligthsGrid, HighligthsItem, HighligthsSelector, HighligthsStyled } from './Highligths.style'

const contents = {
  loans: {
    title: 'Loans',
    content: `Free the equity trapped in your crypto assets by utilizing them to mint a loan for yourself without any paperwork or bankers. Mavryk’s multi asset vaults are maintained by a set of trust-less & decentralized smart contracts that run on the Tezos blockchain.
    
Mavryk vaults allow users to mint for themselves a loan in an algorithmic stablecoin called USDM. Users can deposit multiple assets into the vault to best diversify the stability of their loan. USDM may be used to to earn passive income with a USDM savings account, utilized for yield farming, to leverage their positions, or send to any Tezos wallet.`,
  },
  savings: {
    title: 'Savings APY',
    content: `A savings account mechanism will be offered in order to stabilize the peg of USDM to the US dollar. This acts to offset the sell pressure on USDM and incentivize the use of USDM as a stable mechanism for utilization.
    
There are two main mechanisms that fund the DSR. At first, users will earn MVK as a reward for their deposits. Users will also earn shared rewards from the stability fees earned from the on-chain Mavryk treasury.
    
The DSR allows any to participate in the Mavryk ecosystem by simply purchasing USDM on the open market, without having to expose themselves to maintaining an open loan position.`,
  },
  oracle: {
    title: 'Price Oracle',
    content: `One of the main elements of ensuring that a DeFi ecosystem remains out of the hands of centralized price manipulations is utilizing a decentralized price feed mechanism known as an oracle.

In order to ensure the credibility & accuracy of the price data provided, Mavryk relies on an array of price feed providers known as ‘Satellites.’ Mavryk Satellites follow a consensus mechanism similar to the LPoS mechanism of Tezos, and are required to post a security deposit (bond). If there was a malicious attempt to defraud the system, this would result in a slashing of the Satellite’s collateral as a penalty.`,
  },
  governance: {
    title: 'Governance & Delegation',
    content: `Mavryk’s governance is controlled an on-chain community DAO, via an array of Satellite nodes & delegations. Once launched, MVK stakeholders have direct control of the entire Mavryk ecosystem.

    MVK stakeholders simply need to stake & delegate their tokens to a Satellite of their choice, or choose to operate a Satellite themselves. Similar to Tezos, MVK stakeholders may change Satellites at any moment with zero penalty. This form of delegated democracy helps mitigate low voter turnouts which are detrimental to decentralized entities.
        
    Additionally, governance participation is also rewarded with income from the on-chain Treasury. This incentivizes stakeholders to take an active role in Mavryk’s governance, and rewards them for their advisory similar to how consultants are compensated for their services.`,
  },
  treasury: {
    title: 'Treasury',
    content: ``,
  },
}

export const HighligthsView = () => {
  const [selectedItem, setSelectedItem] = useState(contents.governance)

  return (
    <HighligthsStyled id="highlights">
      <HighligthsContainer>
        <h1>Platform Highlights</h1>
        <HighligthsGrid>
          <HighligthsSelector>
            <HighligthsItem
              selected={selectedItem.title === contents.governance.title}
              onMouseEnter={() => setSelectedItem(contents.governance)}
            >
              <img alt="feature" src="/images/governance.svg" />
              <div>Governance & Delegation</div>
            </HighligthsItem>
            <HighligthsItem
              selected={selectedItem.title === contents.oracle.title}
              onMouseEnter={() => setSelectedItem(contents.oracle)}
            >
              <img alt="feature" src="/images/price.svg" />
              <div>Decentralized Oracle​</div>
            </HighligthsItem>
            <HighligthsItem
              selected={selectedItem.title === contents.treasury.title}
              onMouseEnter={() => setSelectedItem(contents.treasury)}
            >
              <img alt="feature" src="/images/delegations.svg" />
              <div>Treasury</div>
            </HighligthsItem>
            <HighligthsItem
              selected={selectedItem.title === contents.loans.title}
              onMouseEnter={() => setSelectedItem(contents.loans)}
            >
              <img alt="feature" src="/images/dollar.svg" />
              <div>Loans</div>
            </HighligthsItem>
            <HighligthsItem
              selected={selectedItem.title === contents.savings.title}
              onMouseEnter={() => setSelectedItem(contents.savings)}
            >
              <img alt="feature" src="/images/percent.svg" />
              <div>Savings APY​</div>
            </HighligthsItem>
          </HighligthsSelector>
          <HighligthsContent>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.content}</p>
          </HighligthsContent>
        </HighligthsGrid>
      </HighligthsContainer>
    </HighligthsStyled>
  )
}
