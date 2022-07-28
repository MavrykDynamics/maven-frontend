import styled from "styled-components";

export const LBActionStyled = styled.div`
  z-index: 1;
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-end: 4;
  padding: 20px 25px 50px 25px;
  height: fit-content;
  background: #160E3F;
  border: 1px solid #503EAA;
  border-radius: 10px;

  hr {
    height: 2px;
    width: 100%;
    background: #503EAA;
    color: transparent;
    margin: 0;
    border: none;
  }
`

export const ToggleButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-bottom: 42px;
`

export const ActionScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  &.stats {
    row-gap: 20px;
  }

  &.swap {

    .exchange-block {
      display: flex;
      column-gap: 10px;
      margin: 0 auto;
      svg {
        width: 24px;
        height: 18px;
        transform: rotate(90deg);
      }
    }

    .input-wrapper {
      margin: 24px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      svg {
        width: 24px;
        height: 18px;
      }
    }

    .bottom-wrapper {
      margin-top: 40px;
    }
  }
`

export const PriceChange = styled.div<{up?: boolean}>`
  color: ${({up}) => up ? '#27AE60' : '#FF4343'};
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
`