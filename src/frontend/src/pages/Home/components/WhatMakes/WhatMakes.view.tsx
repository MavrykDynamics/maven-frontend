import * as React from 'react'

import data from './WhatMakes.data.json'
import {
  WhatMakesArticlesStyled,
  WhatMakesArticleStyled,
  WhatMakesContainerStyled,
  WhatMakesStyled,
} from './WhatMakes.style'

export const WhatMakesView = () => {
  if (!data.length) return null

  return (
    <WhatMakesStyled>
      <WhatMakesContainerStyled>
        <h2>What Makes Mavryk Unique</h2>
        <WhatMakesArticlesStyled>
          {data.map((item) => (
            <WhatMakesArticleStyled key={item.id}>
              <h3>{item.header}</h3>
              <p>{item.text}</p>
            </WhatMakesArticleStyled>
          ))}
        </WhatMakesArticlesStyled>
      </WhatMakesContainerStyled>
    </WhatMakesStyled>
  )
}
