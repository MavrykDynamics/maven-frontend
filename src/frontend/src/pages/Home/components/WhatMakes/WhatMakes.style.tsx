import styled, { css } from 'styled-components/macro'
import { coralColor, subHeaderColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const WhatMakesStyled = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.whatMakesBackground});

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 93px;
  }
`
export const WhatMakesContainerStyled = styled.div`
  width: 1480px;
  max-width: 100%;
  margin: 0 auto;
`
export const WhatMakesArticlesStyled = styled.div`
  display: flex;
  justify-content: space-between;
`
export const WhatMakesArticleStyled = styled.article<{ theme: MavrykTheme }>`
  max-width: 300px;

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    position: 'relative';
    color: ${subHeaderColor};

    &::after {
      width: 100px;
      height: 4px;
      content: '';
      background-color: ${coralColor};
      display: block;
      margin-top: 12px;
      margin-bottom: 23px;
    }
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.textColor};
  }
`
