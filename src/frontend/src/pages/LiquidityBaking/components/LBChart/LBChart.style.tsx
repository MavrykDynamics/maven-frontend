import styled from 'styled-components'
import { titleColor } from 'styles'
import { BLOCK_RADIUS } from 'styles/constants'

export const ChartStyled = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  background: #160e3f;
  border: 1px solid ${titleColor};
  border-radius: ${BLOCK_RADIUS};
  grid-row-start: 2;
  grid-row-end: 3;
  z-index: 1;

  height: 502px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
