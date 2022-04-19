import * as React from 'react'

import { FeaturesComponent, FeaturesGrid, FeaturesStyled, FeaturesSection } from './Features.style'

export const FeaturesView = () => {
  return (
    <FeaturesSection>
      <FeaturesStyled>
        <FeaturesGrid>
          <FeaturesComponent>
            <img alt="feature" src="/images/money.svg" />
            <div>A Stablecoin You Control</div>
            <p>Put up existing crypto-assets as equity for a USDM stablecoin loan, up to a 50% loan-to-value ratio.</p>
          </FeaturesComponent>
          <FeaturesComponent>
            <img alt="feature" src="/images/plant.svg" />
            <div>Earn With Your USDM</div>
            <p>
              Use your USDM to earn passive income through yield farming, position leveraging, a USDM savings account,
              or by sending to any Tezos wallet.
            </p>
          </FeaturesComponent>
          <FeaturesComponent>
            <img alt="feature" src="/images/piggy.svg" />
            <div>Dynamic Savings Rate</div>
            <p>
              Store your USDM in an interest-paying Dynamic Savings Rate (DSR) account and get paid from the on-chain
              treasury.
            </p>
          </FeaturesComponent>
        </FeaturesGrid>
      </FeaturesStyled>
    </FeaturesSection>
  )
}
