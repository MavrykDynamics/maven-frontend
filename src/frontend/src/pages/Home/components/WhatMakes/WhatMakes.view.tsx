import * as React from 'react'

import {
  WhatMakesStyled,
  WhatMakesArticleStyled,
  WhatMakesArticlesStyled,
  WhatMakesContainerStyled,
} from './WhatMakes.style'

export const WhatMakes = () => {
  return (
    <WhatMakesStyled>
      <WhatMakesContainerStyled>
        <h2>What Makes Mavryk Unique</h2>
        <WhatMakesArticlesStyled>
          <WhatMakesArticleStyled>
            <h3>Governance</h3>
            <p>
              A DAO from day one, Mavryk is built on a fully decentralized, transparent and cooperative governance
              structure.
            </p>
          </WhatMakesArticleStyled>
          <WhatMakesArticleStyled>
            <h3>Security</h3>
            <p>
              Mavryk utilizes the Tezos blockchain for unparalleled transactional security, accuracy and efficiency.
            </p>
          </WhatMakesArticleStyled>
          <WhatMakesArticleStyled>
            <h3>Simplicity</h3>
            <p>
              The Mavryk app features a straightforward app interface that lets you put your money to work in a matter
              of minutes
            </p>
          </WhatMakesArticleStyled>
        </WhatMakesArticlesStyled>
      </WhatMakesContainerStyled>
    </WhatMakesStyled>
  )
}
