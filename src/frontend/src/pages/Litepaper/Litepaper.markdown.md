# Mavryk Litepaper

## Abstract

Mavryk is a decentralized, non-custodial, community-governed banking platform that gives users independent control of their finances. Mavryk enables users to free the equity trapped in their assets, providing liquidity without requiring the involvement of third parties such as banks.

Additionally, Mavryk is a community-governed entity and rewards stakeholder participation for passive or active governance, signing oracle price feeds, and supplying assets to Mavryk’s p2p lending pool, in order to bring stability and prosperity to the platform.

Mavryk’s mission is to launch a suite of decentralized finance products designed to bring financial freedom to all of its users and to bridge the gap between on-chain finance and real world assets.

## Problem

Borrowing money from financial institutions can be difficult and slow: borrowers may face hidden fees, high interest, penalties, and long paperwork which can make access to financial services expensive, or even impossible.

Banks are not always incentivized to innovate, provide lending quickly, or serve marginalized populations. They can and do display rent-seeking behavior and conflicts of interest. As a result, opportunities to create wealth have tended to be concentrated with incumbents, which is not only unjust but also has been and continues to be a missed economic opportunity on a global scale.

**Technology creates new possibilities for fairer capitalism that innovates away from legacy finance, with platforms that offer true and widespread financial freedom, opportunity, and transparency.**

## Solution

Mavryk Finance is cooperatively operated and offers an innovative approach to finance, independent of legacy banks. In technical terms, Mavryk is a Decentralized Autonomous Organization (**DAO**) with:

- non-custodial peer-to-peer lending,
- integrated & decentralized pricing oracles, and
- a decentralized and upgradable governance system modeled after Proof-of-Stake (PoS).

While the applications for such a system are nearly infinite, we *start* in practice with *one specific use case*: borrowing known stablecoins & assets against a multi-asset collateral.

To this end, Mavryk introduces peer-2-peer stablecoin & asset lending of well-known digital assets: **USDT**, **EURL**, **XTZ**, and **tzBTC** which can be borrowed against assets deposited as collateral in a multi-asset, non-custodial Mavryk **vault**.

Notably:

- *Mavryk is trustless and decentralized*: A loan against assets held in a vault is issued, maintained, and repaid using transparent, trustless, and decentralized smart contracts running on a blockchain.
- *Mavryk is inherently multi-asset*: Users can diversify the security of their loan by depositing multiple asset types into a single vault.
- Supplying stablecoins to Mavryk’s lending pools *can generate passive income*. Users can leverage their positions, and practice *yield farming*.[^(1)]

[^(1)]: [Yield farming](https://coinmarketcap.com/alexandria/article/what-is-yield-farming) corresponds to earning interest on a deposit like in a bank.

Mavryk uses [decentralized oracles](#satellites-governance-and-the-decentralized-oracle) to ensure that users' collateral remains free from centralized control and manipulation. Following a model inspired by Proof of Stake’s innovative delegated governance models, Mavryk allows stakeholders to delegate their governance tokens (**MVK**s) to nodes called *Satellites*, who vote on governance proposals and sign price feeds on stakeholders' behalf. For doing this they earn rewards which are passed back (minus a satellite fee) to the delegating stakeholders.[^(2)]

[^(2)]: MVK is the governance token for Mavryk Finance. It is used to operate a Satellite, delegate voting power, and is the payment token that Satellites receive for signing price feeds. More on this [here](#mvk-and-smvk-doorman-module).

## Multi-Asset Backed Loans

Stablecoins are secure and convenient means of payment for goods and services in the context of a crypto-asset portfolio. Mavryk allows its users to put up existing crypto-assets as collateral for a stablecoin loan in USDT or EURL, up to a 50% loan-to-value ratio (**LTV**). For this, we are using a peer-2-peer lending model, where the liquidity for borrowing is provided by user’s seeking to earn yield by lending.

However:

- There is no capital gains tax.
- There is no opportunity cost on any upside potential of the underlying crypto-asset collateral. In other words: the value that your underlying collateral generates while in the Mavryk vault will still accrue to you as its owner.

*Working example: You deposit crypto-assets priced at 10M USD into a Mavryk vault. You borrow up to 5M USDT tokens, with which to transact. A week later, your transactions are complete and your crypto-asset is now priced at 11M USD. You return the 5M USDT (plus interest) and recover your assets from the vault. You do not pay capital gains tax, and you recover the collateral in full even though it is worth more in USD than when you put it in (Always make sure to check your local laws).*

Mavryk loans can be issued against a single asset (single collateral) or a more complex multi-asset basket (multi-collateral). This enables sophisticated risk & return management techniques.[^(3)]

[^(3)]: In contrast with “[HODL](https://academy.binance.com/en/glossary/hodl) ”-ing assets, which are limited to one asset at a time.

You can take out a loan by depositing a single/multi-asset collateral into a vault in what is called a **Collateralized Debt Position** (**CDP**).[^(4)] Vaults are over-collateralized by at least 200% collateral to the requested loan value (=50% LTV).[^(5)] Borrowers can increase their borrowed positions up to the point when they hit the collateralization ceiling.

[^(4)]: _CDP_ is a term originating in the cryptocurrency community for a loan that is collateralized by crypto and usually in connection with an algorithmic stablecoin loan.
[^(5)]: 50% loan-to-value means that there is double the amount of collateral relative to the borrowed amount. This means exactly the same as being 200% over-collateralized. If the loan is 33% LTV, it would be 300% over-collateralized. The higher the collateralization rate, the more secure the loan is against being liquidated in foreclosure due to price movements of the (possibly volatile) underlying crypto used as collateral.

**_The system does not allow you to obtain a loan that would be lower than the required collateralization ratio, i.e., you can borrow up to half the value of the underlying assets. It is highly recommended to healthily over-collateralize the loan, to avoid [liquidations](#liquidations) in the event of a sudden price movement!_**

_For example: Bob deposits $3,000 worth of tzBTC to collateralize a vault, and borrows $1,000 USDT. Bob’s loan is 300% collateralized, and considered an active “healthy” vault._

### Peer to Peer Lending

The Mavryk lending module works in a p2p structure. Users (Lenders) supply assets for other users (borrowers) to borrow using their crypto-assets as collateral in multi-collateral, non-custodial vaults.

### Lending: Earning Yield on Your Assets

Lenders can supply assets; USDT, EURL, XTZ, & tzBTC to lending pools and earn interest. Upon supplying assets to the lending pools, a lender will receive an mToken in return that is a 1-1 representation of their share of the lending pool, such as mUSDT or mEURL. These tokens can be staked in Mavryk’s Yield Farms, further increasing their yield, or traded/sold on the open market. These tokens are the ticket for reimbursement of the original deposit into the lending pool and for claiming lending rewards.

*For example: Alice supplies 25,000 USDT to the Mavryk USDT lending pool. She will receive 25,000  mUSDT which she can keep in her wallet, stake in Mavryk Farms, or trade/sell on the open market. If she chooses to sell/trade her mUSDT tokens, she will be forfeiting the tokens she deposited into the pools (per the amount she sold) and from receiving the rewards for her deposits as she is selling her rights to the new buyer.*

### Borrowing: Single & Multi-Collateral Vaults

Borrowers can borrow assets; (ex. USDT, EURL) from Mavryk’s lending pools and are charged an interest rate on their loans, and one time admin origination fee. To borrow from the Mavryk lending pools, borrowers must open a vault and deposit collateral in them. Upon supplying collateral to a vault, users will be able to borrow a supported asset of their choice (one loaned asset type per vault) with up to a minimum 200% collateral relative to loaned assets in dollar value. Mavryk’s vaults support the ability to deposit multiple types of collateral to back a single loan. Additionally, vaults only support a single asset type to be borrowed, if a user wishes to borrow two different assets (ex. borrowing USDT & EURL) they must do so from separate vaults.

*For example: Bob wants to borrow 1,000 USDT so he deposits 3,000 XTZ (~ $3,000 @ $1/XTZ) into a vault he creates. Upon depositing the XTZ into the vault, Bob is able to withdraw 1,000 USDT from the lending pools. The interest Bob will pay is in USDT. Once Bob repays the loan and interest, he will be able to withdraw the collateral in his vault.*

Note 1: Deposited XTZ in personal vaults may be delegated to a Bakery of your choice, and the earned baking rewards accrue to the vault, and contribute to the vaults collateral ratio.

Note 2: sMVK collateralized in vaults may be delegated to Satellites. However, sMVK collateralization will not be supported at Genesis, and will be voted in via Governance.

### Multi-Collateral Vaults

The Mavryk platform allows users to open multi-collateral vaults for the same loan asset type while ensuring that the collateral to loan ratio stays above the required 200% ratio (collateral to the loan in dollar value). A user is allowed to open a vault and deposit multiple asset types as collateral for their loans. At launch, Mavryk will accept XTZ, tzBTC, SIRS, USDT, EURL, and mTokens as supported assets for collateral. A user is also able to open a vault with one asset as collateral, and later add multiple assets to increase their collateral. However, only one loaned asset per vault is allowed. A user is not able to open a vault and use the collateral they deposited into that vault to borrow different assets. In order to borrow different assets, they will need to open a vault for each type of asset they wish to borrow.

*Example 1: Alice borrows 1,000 USDT by depositing the required amount of XTZ as collateral. Later, she sees that the value of XTZ has dropped and needs to add more collateral to avoid liquidation. Alice realizes she does not have more XTZ but does have tzBTC, so she deposits tzBTC into the USDT vault to increase the collateral ratio. Her vault now has two forms of collateral (XTZ & tzBTC) securing her USDT loan. The loan interest for this vault is in USDT.*

*Example 1, Continued: Alice decides that she wants to borrow EURL. As the vault she originally opened was for USDT, she must open a new vault for EURL. Alice opens a new EURL vault and deposits $3,000 of tzBTC as collateral, and then borrows $800 worth of EURL. The loan interest for this vault is in EURL.*

### Liquidations

A CDP (AKA “vaults”) that falls below the required collateralization ratio (200%) is susceptible to liquidation by a 3rd party user of the platform, in which the repayment of the at risk loan is conducted by the liquidator buying out the collateral from the vault. There are different collateralization ratio status’ for the vaults to asses risk and liquidation events.

- **Low Risk**: The collateral ratio is above 200%, and the user may borrow/withdraw up to the maximum allowable capacity.
- **At Risk**: The collateral ratio is below 200% but above 150%. The user will not be able to borrow or withdraw from the vault, but the vault is not yet liquidatable. It is recommended to increase collateral or repay part of the debt to avoid liquidation below 150%.
- **Mark For Liquidation/Grace Period**: The collateral has fallen below 150%, and any user may then mark the vault for liquidation. Once marked for liquidation, there is a grace period of two hours before the vault may be liquidated.
- **Liquidatable**: The vault collateral is below 150%, marked for liquidation, and the grace period is over. Any user may liquidate the vault by repaying up to 50% of the vaults debt, and receive a 10% reward relative to the liquidated debt.

A vault is liquidatable when it is under-collateralized below the liquidation ratio set in the Lending Controller contract (set by DAO Governance). Before a vault may be liquidated, it will have to be “Marked For Liquidation” by any user of the platform once the collateral falls below the liquidation ratio. After a vault has been marked for liquidation, there will be a grace period (ex. 2 hours, set by governance) where the vault owner has the ability to provide additional collateral to the vault or repay their debt such that it no longer is under-collateralized. After the grace period is over, the vault will be open for liquidation from any user wishing to repay up to 50% the vaults debt, for up to the maximum duration set by governance (ex. 24 hours).

There is a maximum amount that may be liquidated from an at-risk vault, “maxVaultLiquidationPercent,” that can be liquidated during each liquidation window (ex. 50% of the vault’s debt within 24 hours). A liquidator will receive a liquidation fee reward, “liquidationFeePercent”, for liquidating a vault; which is paid for by the vault owner as a penalty. This incentive/penalty amount will initially be set at Genesis at 10%, but may also be adjusted by governance. If a vault has multiple collateral tokens, the reward amount of tokens will be based on their proportional amounts in the vault.

An admin liquidation fee will also be paid to the DAO Treasury whenever a liquidation occurs, and will be based as a percentage of the liquidated amount of debt.

Note: A user will not be able to liquidate a vault if it is not liquidatable at that moment in time or instance (ex. the collateral increases above 150% during the grace period), even if the vault has been previously marked for liquidation and the grace period is over.

***Example 1, a Liquidatable Vault:***

*Alice wants to borrow 500 USDT so she opens a vault and deposits $1,000 worth of XTZ as collateral*

- *Collateral Ratio: 200% (or Loan-To-Value Ratio of 50%)*
- *Liquidation Ratio: 150%*

*Alice borrows the maximum allowable amount of $500 USDT. The liquidation point is calculated as follows: (liquidationRatio * outstandingLoan) / 1000. So given the status of her vault, her liquidation point is: (1500 * 500) / 1000 = 750. So, her vault is liquidatable when the value of the collateral assets in the vault drops to $750.*

***Example continued:*** *If Alice’s vault becomes drops below 150% collateral, then it becomes open to start the liquidation process. First, a vault must be “marked” for liquidation by any user . This triggers a grace period where the owner of the vault can go and add more collateral into the vault  (or repay some debt) and make it no longer at risk. If Alice doesn’t re-collateralize the vault by the time the grace period ends, any user can go and liquidate the vault. The liquidator can repay up to 50% of the vault’s debt balance, and receive the value of their payment from the vault’s collateral, plus a 10% bonus for helping stabilize the platform.*

***Example 2, Vault Liquidation:*** 

*Alice’s vault in the example above is open for liquidation. Bob steps in to liquidate up to 50% of Alice’s $500 in USDT debt, and repays $250 in USDT. By repaying $250 of Alice’s USDT debt, Bob receives $250 in collateral which secured Alice’s loan, plus an additional $25 of collateral (10%) as a reward for liquidating the vault. The Mavryk Finance Treasury also receives $25 of collateral as a fee (this fee is paid by the vault’s collateral, not from the liquidator).*

***Example continued:*** *If the vault is secured by multiple collateral types, the reward paid to the liquidator will be proportional to their percentages in the vault. If the vault has 50% XTZ, and 50% tzBTC, then the liquidation rewards will be paid as 50% XTZ & 50% tzBTC as well.*

## Satellites, Governance, and the Decentralized Oracle

### Satellites

**Satellites** are nodes that administer the Mavryk Finance platform (similarly to Validators on Proof of Stake blockchains). They perform two functions:

1. **Curators of Governance Voting:** Satellites vote on

    - updates to business logic (e.g. disbursing funds from the [Treasury](#governance--treasury), altering the interest rate algorithm for loans etc, and
    - updates to the core Mavryk protocol (e.g. adding a new [collateral asset class for vaults or stablecoin for lending pools](#multi-asset-backed-loans), or adding new smart contracts).
2. **Oracle Price Feed Providers:** Satellites are nodes of Mavryk's decentralized oracle, which provides price data for the assets that can be used as collateral for [the vaults](#multi-asset-backed-loans) (XTZ, tzBTC, SIRS, etc.).

A Satellite can act on its own behalf and can receive delegations on behalf of others.

To operate a Mavryk Satellite, a user needs to stake a security deposit in MVK as a bond, which the user can buy on the open market or earn by participating in the ecosystem (e.g. through yield farming). Technically speaking, a Satellite  may stake a security bond to participate in governance and *not* operate an oracle node, operating a Satellite node for governance is required to operate the oracle node software in order to sign the data feeds.

The supported collateral assets at launch will be XTZ, tzBTC (wrapped BTC), SIRS (the liquidity baking LP token), and Mavryk’s [mTokens](#lending-earning-yield-on-your-assets).

Satellites sign transactions and pay the fees in XTZ. For their XTZ costs, Satellites are reimbursed directly with XTZ. Satellite rewards for their services are paid in sMVK (Governance may add the ability to receive compensation in other assets). The amount that Satellites are paid is set by a [Governance decision](#governance) (to be applied transparently by smart contracts), but as a general rule:

- Governance operations earns staked MVK, and other invoiced assets (ex. USDT)
- Providing Oracle pricing information earns staked MVK and XTZ

**In other words: you get paid cash for contributing your governance power, and you get governance power from helping to determine the value of cash.**

Rewards are distributed to Satellites’ delegates, just as blockchain validators share rewards with their delegates, minus delegation fees.

### Governance

Stakeholders can participate in governance by either delegating their voting power to a Satellite or by operating a Satellite themselves. For this participation, users receive governance and oracle rewards.

There is no cost to [staking MVK to obtain sMVK](#obtaining-smvk) (from here on known as sMVK) aside from the corresponding network transaction fee, and stakeholders are not required to delegate the sMVK that they hold. However, if sMVK is not delegated, there is an opportunity cost of *not* participating in governance and so *not* receiving these rewards (similarly for XTZ in a wallet that is not delegated; it just sits there).

Stakeholders are free to re-delegate to a different Satellite whenever desired, and with zero penalties.

Governance votes, whether for the business logic or upgrades to the Mavryk ecosystem, are rewarded with a portion of the earned income from the on-chain [Treasury](#treasury). This functions to reward stakeholders who participate in guiding the platform, similarly to how consultants are remunerated for their advisory services.

This form of representative liquid democracy incentivizes stakeholders to participate in governance (either directly, by setting up a Satellite, or indirectly by delegating to one), and so contributes to voter participation and the stability of the system.

### Satellite Delegations

Stakeholders can participate in governance without setting up their own Satellite: they can delegate their governance power (i.e. their sMVK) to an existing Satellite. The Satellite cannot transfer or spend the delegated sMVK tokens; it can only use the delegated tokens to vote.

However, if the Satellite behaves maliciously then a Satellite may be suspended or banned via Satellite governance super majority. This incentivizes stakeholders to delegate responsibly and perform due diligence when choosing a Satellite, as they may not receive rewards if their Satellite ceases operations. This accountability also helps maintain the quality of the price feeds to the system overall.

Running a Satellite and delegating sMVK requires staking the tokens via the *Doorman Module*, as discussed below.

### The Decentralized Oracle

The Mavryk system relies on Satellites to provide accurate and reliable pricing information for its collateral asset classes. Mavryk also uses a similar consensus mechanism to Liquid Proof of Stake (LPoS), by weighing the data from Satellites using their respective stake in the system.

Satellites are required to stake MVK to participate in governance and thus are exposed to price volatility. Satellites are incentivized to provide correct data, since otherwise, their sMVK stake can lose value in the event of a malicious action or attack.

*For example, suppose a malicious actor wants to skew the price of a Bitcoin collateral in the Mavryk system so that he can borrow an excessive amount of USDT. He purchases MVK, stakes it, and bonds it to set up a malicious Satellite that feeds false pricing data into the system. The system will then detect this attempt – thanks to the distribution of Satellites – and penalize the Satellite network may remove a malicious Satellite with an super majority Satellite vote, banning the address from further Satellite operations.*

## MVK and sMVK (Doorman Module)

### What is MVK and how does it differ from sMVK?

MVK is the governance token of the Mavryk network.

It is a fully transferable token on the Tezos network. Broadly speaking, 1 MVK gives 1 vote on a [governance decision](#governance) (Mavryk governance is like proof-of-stake: a user's voting power is proportional to the MVK held).

However, to use MVK to *actually vote*, a user must first **stake** it via the **doorman module**. This Tezos smart contract tracks MVK tokens and records the staking and delegating of MVK *non-transferable* token called sMVK (staked MVK). sMVK represents MVK locked inside the Mavryk ecosystem. This staked version of MVK will not appear in a users’ wallet, but will appear on the user’s personal dashboard. It is solely tracked on the blockchain.

MVK is a Tezos *FA2* token: it exists outside of the Mavryk Finance system and can be freely traded. sMVK is not an *FA* token, but it is used as an internal accounting token and has special permissions to interact with the Mavryk system (described [below](#obtaining-smvk)), e.g. it is not transferable between users but can be used to vote on Governance decisions.

In other words: sMVK is the staked form of MVK, and represents a direct right to vote in the governance of Mavryk, whereas MVK is a freely tradable Tezos token whose underlying value is precisely the ability to obtain the right to Mavryk’s governance.

We explain the motivation for separating the tradable token MVK from the voting form sMVK below.

Finally, the voting power of sMVK can be delegated to a satellite but not transferred. You always stay in full control of your sMVK.

### Obtaining sMVK

Users may obtain sMVK in several ways:

1. Staking their MVK to sMVK at a 1:1 ratio (1MVK = 1sMVK).
2. Earning sMVK from participating in the incentive programs (e.g. yield farms or yield from supplying assets to [Mavryk’s lending pools](#lending-earning-yield-on-your-assets)).
3. Delegating their sMVK to a Satellite, and earning a share of that Satellite's sMVK rewards for [Governance](#governance) or [Oracle price information](#the-decentralized-oracle).
4. Users may also be awarded sMVK as their share of the system's [sMVK exit fees as discussed below](#converting-smvk-back-to-mvk-exit-fees).
5. From liquidating vaults which contain sMVK as collateral.

sMVK holders enjoy benefits which include (non-exhaustive list):

- **Governance Rewards:** Voting on governance decisions is incentivized with lending fees & sMVK, and shared with delegates.
- **Oracle Rewards:** Providing price feed data will be incentivized via sMVK rewards and shared with delegates.
- **Exit Fee Rewards:** Distributed to sMVK holders as a reward for staying locked.
- **Operating A Satellite:** Users need to provide a sufficient amount of sMVK.

### Converting sMVK back to MVK (exit fees)

To redeem sMVK back to MVK, users need to pay an exit fee in sMVK tokens, which is automatically distributed to the remaining sMVK holders. This is conducted to offset the opportunity cost of remaining locked and to maintain platform & oracle stability.

The fee is dynamically computed based on the **MVK Loyalty Index (MLI)**, which is calculated as a percentage

<img src="/images/eq-mli.png" width="330" id="eq-mli-img"/>

*Example: if the sMVK<>MVK ratio is 9:1 then the MLI = 90%; if the sMVK<>MVK ratio is 6:4 then the MLI = 60%. When MVK is minted, the total supply of MVK increases, and the MLI decreases. However, as users stake their MVK for sMVK, the MLI increases.*

**The exit fee is structured so that a higher MLI means a lower exit fee rate**, by the following equation:

<img src="/images/eq-mli-fee.png" width="330" id="eq-mliFee-img"/>

![mli-fee-graph.jpg](/images/mli-fee-graph.png)
*Graph representing the fee for withdrawing sMVK to the current MLI*


The curve is designed so that users are incentivized to stake their MVK. If the MLI goes below 20%, the fee increases rapidly in order to help maintain a healthy ratio of locked MVK and secure the Mavryk governance and ecosystem, yet has a max fee to not punish users that are slower to withdraw.

Rule of thumb: if sMVK is scarce then converting sMVK into MVK is relatively expensive, and if sMVK is plentiful then converting sMVK into MVK is relatively cheap.

The exit fee and MLI formulas are governable, and updatable by the Satellites via governance.

## Governance & Treasury

Blockchain technology offers the revolutionary capability to build so-called *trustless* applications. Trust still matters in trustless systems, but the difference is that it is *decentralized*. Historically, a powerful central authority was required for stability, now trust can be distributed with decentralized smart contracts amongst multiple actors, in new, innovative, and unprecedented ways.

In particular, the approach taken by Mavryk is to digitally allocate proportional amounts of responsibility to actors (as discussed above). Individual actors can fail without compromising the platform’s overall integrity and without compromising trust – whereas in an ‘old-fashioned’ centralized system, failure of the one central authority can be catastrophic.

### Decentralization

Mavryk is not a project which promises to transition from centralized to decentralized controls. As we believe that **governance is key**, Mavryk provides concrete mechanisms to launch as a DAO (Decentralized Autonomous Organization), using a model based on robust Proof of Stake governance models.

Mavryk will have built-in on-chain governance from the start, treating it as a cornerstone of the design rather than an afterthought. An upgrade proposal can be submitted on-chain as a smart contract and voted on by Satellites, and in the case of a “yay”, the upgrade passes to the next round of the governance cycle. The ecosystem does *not* rely on central actors to carry out decisions. There are four rounds of governance periods to accept a governance proposal.

1. Proposal Round
2. Voting Round
3. Timelock Round
4. Execution Round

This model of decentralized governance has successfully powered numerous blockchains since smart contracts blockchains have adopted on-chain governance mechanisms.

Below are examples of governance decisions:

- General upgrades to the protocol
    - New multi-asset vaults
    - Providing incentives to move to newer versions of vaults
    - Different types of lending
    - Change of functions/entrypoints
    - Upgrade of contracts (moving from v1>v2 in a decentralized governance manner)
    - Addition of new contracts to the Mavryk system
- Minting of MVK to fund
    - Farms
    - Satellites
    - Mavryk Council
- Change of parameters
    - Collateralization ratio of CDPs
    - New Lending Pools
    - Supported assets as collateral
    - MLI & exit fees

### Voting power

Initially, substantial voting power will lie in the hands of the core team and private contributors, although far below any threshold for control.[^(6)] The system is designed to incentivize participation so that with time the community gains a larger percentage of the circulating token supply. The community will grow beyond the initial core contributors as other actors become active to participate to earn rewards. The overall governance power will pass smoothly to the broader community.

Specifically, this is achieved by the rate at which new governance tokens are released to the ecosystem through farms and other incentive programs.

[^(6)]: The section [tokenomics](#tokenomics) provides an overview of token distribution and circulating supply.

The token genesis is minted and distributed according to the [initial supply plan](#tokenomics). Stakeholder tokens from private contributions and the team are controlled by vesting contracts that mint and release them according to a monthly schedule.

### Voting with Satellites (electoral delegates)

After the launch, Satellites will form the backbone of the system and will accept sMVK delegations by stakeholders and vote on their behalf.

*This is similar to the approach of delegators to validators on the Proof of Stake networks.*

Thanks to this representative democracy model, stakeholders of sMVK are not required to regularly cast votes, and the level of a Satellite’s engagement in governance influences the choice of delegates.

### Treasury

The **Treasury** is a Tezos smart contract that will hold

- the assets contributed in the token launch, and
- all subsequent revenue (e.g. interest fees and liquidation fees).

The Treasury will also hold income from future Mavryk products. The Treasury will hold various type of assets such as wrapped assets, liquidity pool tokens, and stablecoins. The Treasury will also mint sMVK and distribute it accordingly to incentive programs (farms, satellites, etc), or for funding entities.

The Mavryk Council will initiate financial governance requests that will be governed by the community (via Satellites), not by individuals or entities. If a Satellite wishes to disburse Treasury funds, it may do so via core governance proposals. Financial requests initiated by Satellites will be a future upgrade. Furthermore, **Treasury assets will not be used to vote on proposals.** Whenever a value is moved from the Treasury, a public vote must occur and be recorded on-chain.

A series of sub-treasuries will be created for specific purposes, similar to sub-accounts within an entities bank account. Satellites may also choose to create new sub-treasuries via the governance process. The Global Treasury, the default displayed Treasury, will reflect the total value from all sub-treasuries, such as;

- Research & Development
- Investment Treasury
- MVK buyback for oracle rewards & yield farms
- DAO Bakery Fund via XTZ purchases

## Mavryk Council

The Mavryk Council is operated by members of a Gibraltar-based legal entity that performs operations to develop the Mavryk Finance ecosystem. Some responsibilities include maintaining contracts with developers, marketers, and lawyers. The Council also serves to maintain interactions that require off-chain capabilities.

The Council’s inception happens after the initial MVK distribution. The Council is a separate entity from the Satellite governance and the Treasury. The Council can receive funds (e.g. MVK) from the Treasury, following on-chain Governance votes by the community.

MVK for Operations will be sent to the 3 of 5 multi-sig held by the board members of the Council and vested over 5 years. The Council board will be charged with disbursing assets to expand the Mavryk Finance ecosystem and develop new products and features.

The multi-sig is designed to limit the powers of any individual, and eliminate the possibility of a loss of funds due to any single point of failure.

## Emergency Governance & Break Glass

Like all software products, and especially DeFi projects, there is a constant threat of hacks, theft, fraud, and possibility for bad actors to take advantage of the system. This is why the Mavryk Finance platform has built in an emergency governance system and break glass ability. In the event of a flaw being exploited or a hack of the system. Anyone can vote on emergency governance to initiate break glass and pass emergency powers to the break glass council.

### Emergency Governance

Any sMVK holder can initiate an emergency governance vote to activate the system wide break glass and pass emergency powers to the break glass council. The vote requires a simple majority of all sMVK to pass. Upon its passage, the “glass is broken” and the Break Glass Council (see below) can pause all smart contracts, and can now enact actions to prevent widespread damage to the system.

**Note: Emergency Governance is voted on by all sMVK stakeholders, not only Satellites, and is reliant on all sMVK to vote individually to break the glass.**

### Break Glass Council

At Genesis, the Break Glass Council are the same members of the Mavryk Council, that performs operations to develop the Mavryk Finance ecosystem. It is a multi-sig contract with several council members, any of the members can initiate an action and it requires a majority of the multi-sig owners to approve said action. Once the glass is broken, the council has the power to pause/unpause all major entry points (preventing hackers from continuing to siphon funds from the system), change the admins from a set of whitelisted addresses, and more. The subsequent admin addresses will be able to update the contract lambdas.

It is important to note that the Break Glass council can only take emergency action only upon successful trigger of emergency governance.

### Break Glass: Access Control Layer

Below describes the access control layer for all of the Mavryk Finance smart contracts in 3 different status’. Meaning, who are the admins of each smart contract under which status.

1. Under normal conditions
2. During Break Glass and the different stages of it
3. Upgrading - upgrades from governance decisions


1. Outline of Mavryk Finance's Access control layer under normal conditions
![acl-normal.png](/images/acl-normal.png)


2. Outline of Mavryk Finance's Access control layer during the Break Glass process
![acl-break-glass.png](/images/acl-break-glass.png)


3. Outline of Mavryk Finance's Access control layer during the contract upgrade process
![acl-upgrade.png](/images/acl-upgrade.png)




## Yield Farming

The Mavryk Finance platform produces several liquid tokens in its ecosystem, such as the different LP “receipt” tokens from the p2p lending (known as mTokens) and its own native MVK governance token. As part of the strategy to increase on-chain liquidity, a liquidity pool of MVK/XTZ will be launched with initial liquidity provided by the bootstrapping contributions from the public.

Initially, the liquidity should be sufficient to enable low-slippage trading at reasonable volumes as providing liquidity for the MVK/XTZ pair is incentivized by a series of yield/liquidity farms.

Additionally, Mavryk Finance will also incentivize users to deposit liquidity for the lending pools. Liquidity providers will be able to stake their LP mTokens (programmable shares of a liquidity pool) within yield farms to receive additional sMVK as a bonus incentive, in addition to the yield they earn from the lending pools. The amount of sMVK rewards depends on how long the LP mTokens are staked. By default, Mavryk farms are spawned for three months. Afterward, a governance vote will be required to either rehydrate existing farms and restart their lifecycle or spawn new farms.

When the Mavryk platform goes live, yield farms for the following liquidity pools will be available:

MVK/XTZ, MVK/USDT, mXTZ, mUSDT, and mtzBTC.

## Tokenomics

**MVK Max Supply: 1,000,000,000 tokens (10^9 MVK tokens).**

- 32% Incentives
    - 30% Oracle Rewards & Yield Farming
    - 2% Initial Liquidity Pool
- 25% Core Contributors, Team, & Advisors
    - 19% Founders & Development Team
    - 6% Advisors
- 25% Ecosystem
    - 10% DAO Treasury (on-chain community vote for use of funds)
    - 10% Council Treasury (vested over 5 years)
    - 5% Marketing & Promotions
- 18% Contributors
    - 16% Private Sale
    - 2% Public Liquidity Sale

![tokenomics_planet.png](/images/tokenomics_planet.png)

The team and advisors have a 24 months linear vesting schedule at Genesis. Private contributor tokens follow a 24-20-16 month vesting schedule from Genesis with linear vesting.

### Revenue Model

Revenue is generated through loan interest, admin origination fees, and liquidation fees. The interest fee is paid by the borrower when closing a debt position (paying back their loan). This fee is proportionate to the amount of the loan relative to how long the loan was open. The liquidation fee occurs when an at-risk vault is liquidated and is on top of the interest. The liquidation fee is 10%.[^(7)]

[^(7)]: This fee exists to close a loophole where an owner liquidates himself over and over.

**The interest, liquidation, and admin origination fees are all governable by stakeholders and can be updated by community vote.**

The revenue is automatically deposited within the Treasury, where a reserve of XTZ, USDT, and EURL is put aside to hedge against extreme market drops which might push at-risk vaults into an under-collateralized ratio so low that it would impossible to liquidate (as no rational investor would pay more money than what the collateral in the vault is worth). The reserve provides stablecoin liquidity to be injected in case of such an event and to maintain overall system stability.

Once Mavryk Finance is adopted and generating revenue, it is up to Governance to vote on disbursing the stablecoin revenue generated from the Treasury to fund further development, to incentivize Governance participation, to perform a buyback of MVK on the open market to incentivize Satellite price feeds & yield farms, and to invest in assets to be held by the Treasury.

### Token Flow

The following diagram shows the flow of value (tokens) between various modules of the system (smart contracts). Those smart contract modules are the

- [Doorman module](#mvk-and-smvk-doorman-module),
- External exchange module,
- [Yield-farm module](#yield-farming),
- [Loan module](#multi-asset-backed-loans),
- [Governance module](#governance),
- [Price feed module / Satellites](#the-decentralized-oracle)
- [Mavryk Council module](#mavryk-council)
- [Emergency Governance & Break Glass module](#emergency-governance--break-glass)

We outline their interactions in the following overview diagram:

<img src="/images/litepaper-flow.png" />

<center><i>
Outline of Mavryk system modules and their interactions
</i></center>
