import * as React from 'react'

import { PartnersGrid, PartnersGrid2, PartnersStyled } from './Partners.style'

export const PartnersView = () => {
  return (
    <PartnersStyled>
      <PartnersGrid>
        <a href="https://tezos.co.il/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/tezos-israel.svg" />
        </a>
        <a href="https://tzbaker.co.il/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/bakery-il.png" />
        </a>
        <a href="https://collective-ventures.org/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/collective-ventures.svg" />
        </a>
        <a href="https://www.ebnlaw.co.il/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/ebn-go.png" />
        </a>
      </PartnersGrid>
      <PartnersGrid2>
        <a href="https://www.wentworthhall.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/wentworth-hall.png" />
        </a>
        <a href="https://www.evg.co/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/everest-block-ventures.png" />
        </a>
        <a href="https://blockchase.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/blockchase.svg" />
        </a>
      </PartnersGrid2>
    </PartnersStyled>
  )
}
