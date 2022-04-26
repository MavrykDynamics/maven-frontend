import styled, { css } from 'styled-components/macro'
import { coralColor, subHeaderColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

import { CONTAINER_WIDTH } from '../../Home.style'

export const WhatMakesStyled = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.whatMakesBackground});
  padding-top: 134px;
  padding-bottom: 190px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (max-width: 1000px) {
    padding-top: 16px;
    padding-bottom: 64px;
  }

  @media (max-width: 700px) {
    padding-bottom: 32px;
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 93px;
    color: ${({ theme }) => theme.headerSectionsColor};

    @media (max-width: 1000px) {
      font-size: 36px;
      line-height: 1.5;
      margin-bottom: 32px;
      padding-top: 40px;
    }

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }
`
export const WhatMakesContainerStyled = styled.div`
  width: ${CONTAINER_WIDTH};
  max-width: calc(100vw - 260px);
  margin: 0 auto;

  @media (max-width: 1000px) {
    max-width: calc(100vw - 80px);
  }

  @media (max-width: 700px) {
    max-width: calc(100vw - 40px);
  }
`
export const WhatMakesArticlesStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
export const WhatMakesArticleStyled = styled.article<{ theme: MavrykTheme }>`
  max-width: 300px;

  @media (max-width: 700px) {
    max-width: 100%;
    margin-bottom: 16px;
  }

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    position: relative;
    color: ${({ theme }) => theme.headingColor};

    @media (max-width: 1000px) {
      font-size: 24px;
    }

    &::after {
      width: 100px;
      height: 4px;
      content: '';
      background-color: ${coralColor};
      display: block;
      margin-top: 12px;
      margin-bottom: 23px;

      @media (max-width: 1000px) {
        margin-top: 4px;
        margin-bottom: 16px;
      }
    }
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.textColor};

    @media (max-width: 1000px) {
      font-size: 15px;
      line-height: 1.5;
      padding-right: 16px;
    }

    @media (max-width: 700px) {
      padding-right: 0;
    }
  }
`
