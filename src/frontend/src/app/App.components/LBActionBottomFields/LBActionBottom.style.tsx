import styled from 'styled-components'
import {MavenTheme} from 'utils/interfaces'

export const LBActionBottomWrapperStyled = styled.div<{ theme: MavenTheme }>`
  row-gap: 7px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > div {
    height: 25px;

    @media screen and (max-width: 490px) {
      height: fit-content;
      align-items: flex-start;
    }
  }

  .controls-wrapper {
    display: flex;
    align-items: center;
    height: 30px;
    column-gap: 15px;

    #inputStyled {
      margin: 0;

      input {
        max-width: 80px;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0;
        padding-left: 10px;
        color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
      }

      .pinned-text {
        top: 50%;
        font-size: 16px;
        transform: translateY(-50%);
      }
    }
  }

  @media screen and (max-width: 450px) {
    > div {
      div {
        font-size: 14px;
      }
    }
  }
`
