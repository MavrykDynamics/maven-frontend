import styled from "styled-components";

// components
import { Card } from "pages/Bakery/Bakery.style";

export const FrequentlyAskedQuestionsStyled = styled(Card)`
  padding-left: 0;
  padding-right: 0;

  h1 {
    margin-bottom: 65px;
  }
`

export const FrequentlyAskedQuestionsCard = styled.div`
  padding: 0 40px;
  border-top: 1px solid ${({ theme }) => theme.lbBorder};

  h2 {
    margin: 20px 0;

    font-weight: 600;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.textSkyColor};
  }
  
  p:last-of-type {
    margin-bottom: 30px;
  }
`
