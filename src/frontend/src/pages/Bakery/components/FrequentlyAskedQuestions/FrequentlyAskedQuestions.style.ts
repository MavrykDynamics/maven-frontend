import styled from "styled-components";

// components
import { Card } from "pages/Bakery/Bakery.style";

export const FrequentlyAskedQuestionsStyled = styled(Card)`
  padding-left: 0;
  padding-right: 0;

  h1 {
    margin-bottom: 65px;
    padding: 0 20px;
  }

  @media screen and (max-width: 600px) {
    h1 {
      margin-bottom: 30px;
    }
  }
`

export const FrequentlyAskedQuestionsCard = styled.div`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.strokeCards};
  cursor: pointer;

  &:last-of-type {
    border-bottom: 1px solid transparent;
  }

  &:hover,
  &.active {
    border-bottom: 1px solid ${({ theme }) => theme.linksAndButtons};

    &::before {
      position: absolute;
      top: -21px;

      display: block;
      height: 1px;
      width: 100%;

      content: '';
      background-color: ${({ theme }) => theme.linksAndButtons};
    }
  }

  &:last-of-type {
    border-bottom: 1px solid transparent;
  }

  p, h2 {
    padding: 0 40px;
  }

  h2 {
    margin: 20px 0;

    font-weight: 600;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.linksAndButtons};
  }
  
  p:last-of-type {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 600px) {
    h2, p {
      padding: 0 20px;
    }

    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
    }
  }
`
