import styled, { css } from 'styled-components/macro'
import { coralColor, subHeaderColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

import { CONTAINER_WIDTH } from '../../Home.style'

export const RoadmapStyled = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.starsBachground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  position: relative;
  padding-top: 0;
  margin-bottom: 90px;

  @media (max-width: 1000px) {
    padding-top: 0;
    padding-bottom: 0;
  }

  @media (max-width: 700px) {
    padding-bottom: 0;
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 90px;
    color: ${({ theme }) => theme.headerDarkColor};

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

export const RoadmapArticles = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  justify-content: center;

  @media (max-width: 1300px) {
    padding: 0 40px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    position: relative;
    padding-top: 21px;
  }

  &::after {
    content: '';
    background: linear-gradient(
      90deg,
      rgba(134, 212, 201, 1) 0%,
      rgba(134, 212, 201, 1) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    height: 15px;
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(50% + 70px);

    @media (max-width: 1190px) {
      top: calc(50% + 65px);
    }

    @media (max-width: 1000px) {
      top: 0;
      height: 92%;
      width: 15px;
      background: linear-gradient(
        178deg,
        rgba(134, 212, 201, 1) 0%,
        rgba(134, 212, 201, 1) 55%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 50%;
      transform: translateX(-50%);
    }
  }
`
export const RoadmapArticle = styled.article<{ theme: MavrykTheme }>`
  display: grid;
  grid-template-rows: 202px 124px 1fr;

  @media (max-width: 1190px) {
    grid-template-rows: 222px 124px 1fr;
  }

  @media (max-width: 1000px) {
    width: calc(50% - 40px);
    display: flex;
    flex-direction: column;
  }

  &:nth-child(1) {
    blockquote {
      max-width: 400px;
    }
  }

  &:nth-child(2) {
    @media (max-width: 1000px) {
      align-self: flex-end;
      align-items: baseline;
      margin-top: -46px;
      margin-bottom: -40px;

      figure {
        align-items: baseline;
      }
    }

    blockquote {
      order: -1;
      padding-top: 0;
      padding: 0 93px;

      @media (max-width: 1450px) {
        padding: 0 32px;
      }

      @media (max-width: 1300px) {
        padding: 0;
      }

      @media (max-width: 1000px) {
        order: 0;
      }
    }

    aside {
      order: 1;

      @media (max-width: 1000px) {
        order: 0;
      }
    }
  }

  blockquote {
    margin: 0;
    padding-top: 42px;

    @media (max-width: 1000px) {
      padding-top: 0;
    }

    div {
      border: 1px solid ${({ theme }) => theme.inputBorderColor};
      border-radius: 10px;
      padding: 30px;

      @media (max-width: 1000px) {
        padding: 20px;
      }
    }
  }

  aside {
    @media (max-width: 1000px) {
      display: none;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    text-align: left;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.headingColor};

    @media (max-width: 1000px) {
      font-size: 24px;
      line-height: 1.1;
    }
  }

  ul {
    margin: 0;
    text-align: left;
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.headingColor};

    @media (max-width: 1000px) {
      font-size: 15px;
      line-height: 1.2;
    }

    &::before {
      content: '-';
      margin-right: 6px;
    }
  }

  figure {
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: flex-end;

    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  figcaption {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    padding-bottom: 10px;
    color: ${({ theme }) => theme.roadmapValueColor};

      padding-top: 14px;
      padding-bottom: 16px;
    }
  }
` /*RoadmapArticle*/
