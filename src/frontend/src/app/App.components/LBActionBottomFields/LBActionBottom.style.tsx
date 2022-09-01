import styled from 'styled-components'

export const LBActionBottomWrapperStyled = styled.div`
  margin-top: 40px;
  row-gap: 15px;
  display: flex;
  flex-direction: column;

  > div {
    height: 25px;
  }

  #inputStyled {
    height: fit-content;
    margin-top: 10px;
    margin-bottom: 0;
  }

  &.liquidity {
    margin-top: 30px;
  }
`
