import styled, { css } from "styled-components";

export const LBFAQStyled = styled.div`
  grid-column-end: 3;
  grid-column-start: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  z-index: 1;

  background: #160E3F;
  border: 1px solid #503EAA;
  border-radius: 10px;
  padding: 50px 40px 80px 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const FaqItem = styled.div<{last?: boolean;}>`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;

  ${({last}) => last ? '' : css`
  &::before {
    content: '';
    position: absolute;
    bottom: -32px;
    left: 0;
    height: 2px;
    width: 100%;
    background: #503EAA;
  }`}
`