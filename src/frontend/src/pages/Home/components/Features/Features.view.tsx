import * as React from 'react'

import data from './Features.data.json'
import { FeaturesComponent, FeaturesGrid, FeaturesStyled, FeaturesSection } from './Features.style'

export const FeaturesView = () => {
  if (!data.length) return null

  return (
    <FeaturesSection>
      <FeaturesStyled>
        <FeaturesGrid>
          {data.map((item) => (
            <FeaturesComponent key={item.id}>
              <img alt={item.header} src={item.img} />
              <h3>{item.header}</h3>
              <p>{item.text}</p>
            </FeaturesComponent>
          ))}
        </FeaturesGrid>
      </FeaturesStyled>
    </FeaturesSection>
  )
}
