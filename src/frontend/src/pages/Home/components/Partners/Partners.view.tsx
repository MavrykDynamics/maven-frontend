import * as React from 'react'

import { PartnersGrid, PartnersStyled } from './Partners.style'

export const PartnersView = () => {
  return (
    <PartnersStyled>
      <h2>In partnership with:</h2>
      {/* <PartnersGrid>
        <figure>
          <a href="https://drapergorenholm.com/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/draper_goren_holm.png" />
          </a>
          <a href="https://tezos.co.il/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/tezos-israel.svg" />
          </a>
          <a href="https://ghafcapital.ae/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/ghaf_capital_partners.png" />
          </a>
          <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/big_brain_holdings.png" />
          </a>
        </figure>

        <figure>
          <a href="https://metavest.capital/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/metavest_capital.png" />
          </a>
          <a href="https://angeldao.org/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/angel_dao.png" />
          </a>
          <a href="https://collective.town/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/collective-ventures.svg" />
          </a>
          <a href="https://bullperks.com/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/bull_perks.png" />
          </a>
          <a href="https://www.atlas.fund/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/atlas_fund.png" />
          </a>
        </figure>

        <figure>
          <a href="https://tzbaker.co.il/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/bakery-il.png" />
          </a>
          <a href="https://www.wentworthhall.com/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/wentworth-hall.png" />
          </a>
          <a href="https://www.evg.co/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/everest-block-ventures.png" />
          </a>
          <a href="https://blockchase.com/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/blockchase.svg" />
          </a>
        </figure>

        <figure>
          <a href="https://www.cluster.vc/" target="_blank" rel="noreferrer" className="partner-cluster">
            <div>
              <img  alt="partner" src="/images/partners/cluster.png" />
            </div>
          </a>
          <a href="https://neofacto.com/home/" target="_blank" rel="noreferrer" className="partner-neo-facto">
            <img  alt="partner" src="/images/partners/neo-facto.svg" />
          </a>
          <a href="https://www.nomadic-labs.com/" target="_blank" rel="noreferrer">
            <img  alt="partner" src="/images/partners/nomadic-labs.svg" />
          </a>
        </figure>
      </PartnersGrid> */}
      <PartnersGrid>
        <a href="https://drapergorenholm.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/draper_goren_holm.png" />
        </a>
        <a href="https://tezos.co.il/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/tezos-israel.svg" />
        </a>
        <a href="https://ghafcapital.ae/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/ghaf_capital_partners.png" />
        </a>
        <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/big_brain_holdings.png" />
        </a>

        <a href="https://metavest.capital/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/metavest_capital.png" />
        </a>
        <a href="https://angeldao.org/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/angel_dao.png" />
        </a>
        <a href="https://collective.town/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/collective-ventures.svg" />
        </a>
        <a href="https://bullperks.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/bull_perks.png" />
        </a>
        <a href="https://www.atlas.fund/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/atlas_fund.png" />
        </a>

        <a href="https://tzbaker.co.il/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/bakery-il.png" />
        </a>
        <a href="https://www.wentworthhall.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/wentworth-hall.png" />
        </a>
        <a href="https://www.evg.co/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/everest-block-ventures.png" />
        </a>
        <a href="https://blockchase.com/" target="_blank" rel="noreferrer">
          <img alt="partner" src="/images/blockchase.svg" />
        </a>

        <a className="empty" />
        <a href="https://www.cluster.vc/" target="_blank" rel="noreferrer" className="partner-cluster">
          <div>
            <img alt="partner" src="/images/partners/cluster.png" />
          </div>
        </a>
        <a href="https://neofacto.com/home/" target="_blank" rel="noreferrer" className="partner-neo-facto">
          <img alt="partner" src="/images/partners/neo-facto.svg" />
        </a>
        <a href="https://www.nomadic-labs.com/" target="_blank" rel="noreferrer" className="partner-nomadic">
          <img alt="partner" src="/images/partners/nomadic-labs.svg" />
        </a>
      </PartnersGrid>
    </PartnersStyled>
  )
}
