import styled, { css } from 'styled-components'
import { cyanColor, headerColor, silverColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const TopBarLinksStyled = styled.div<{ useClickOpening?: boolean; selected?: boolean; theme: MavrykTheme }>`
  margin: 0 25px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;

  @media screen and (min-width: 870px) and (max-width: 1400px) {
    margin: 0 15px;
  }

  .group-name {
    font-size: 20px;
    line-height: 0;
    transition: 0.35s all;
    cursor: pointer;
    color: ${({ theme }) => theme.topBarLinkColor};
    font-weight: 600;
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 17px;
      margin-left: 8px;
      transform: rotate(-90deg);
      transition: 0.6s all;
      display: block;
      stroke: ${({ theme }) => theme.topBarLinkColor};
    }

    a {
      color: ${({ theme }) => theme.topBarLinkColor};
      transition: 0.35s all;
    }

    ${({ useClickOpening }) =>
      !useClickOpening
        ? css`
            &:hover {
              color: ${({ theme }) => theme.topBarLinkColorActive};

              svg {
                stroke: ${({ theme }) => theme.topBarLinkColorActive};
                transform: rotate(90deg);
              }

              a {
                color: ${({ theme }) => theme.topBarLinkColorActive};
              }
            }
          `
        : ''}

    @media screen and (max-width: 1380px) {
      font-size: 18px;
    }
  }

  .group-links {
    display: flex;
    padding: 20px 5px 20px 15px;
    background: ${({ theme }) => theme.darkBackroundColor};
    transition: 0.6s all;
    flex-direction: column;
    row-gap: 15px;

    .link-wrapper {
      width: 100%;
      position: relative;
      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(.disabled),
      &.selected {
        &::before {
          content: '✓';
          position: absolute;
          right: 10px;
          font-size: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: ${({ theme }) => theme.topBarLinkColorActive};
        }
      }
    }

    a {
      text-transform: capitalize;
      position: relative;
      white-space: nowrap;
      font-size: 18px;
      transition: 0.35s all;
      width: 120%;
      padding: 6px 0;
      font-weight: 600;
      padding-left: 10px;
      border-radius: 5px;
      color: ${({ theme }) => theme.topBarLinkColor};

      &.disabled {
        pointer-events: none;
      }

      &:hover:not(.disabled),
      &.selected {
        color: ${({ theme }) => theme.topBarLinkColorActive};
      }
    }
  }

  ${({ useClickOpening }) =>
    !useClickOpening
      ? css`
          &:hover {
            cursor: pointer;
            svg {
              transform: rotate(90deg);
            }
          }
        `
      : ''}

  ${({ useClickOpening, selected }) =>
    useClickOpening
      ? css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: fit-content;
          margin: 0;

          .group-name {
            align-self: flex-start;
            line-height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;

            ${() =>
              css`
                &:not(.selected):before {
                  position: absolute;
                  height: 2px;
                  width: 100%;
                  left: 0;
                  bottom: -10px;
                  content: '';
                  color: ${({ theme }) => theme.topBarLinkColorActive};
                }
              `}

            &.selected {
              color: ${({ theme }) => theme.topBarLinkColorActive};

              svg {
                stroke: ${({ theme }) => theme.topBarLinkColorActive};
                transform: rotate(90deg);
              }
            }
          }

          &:nth-last-child(2) {
            .group-name {
              &::before {
                display: none;
              }
            }
          }

          .group-links {
            height: fit-content;
            width: 100vw;
            align-items: center;
            max-height: 0;
            display: none;
            overflow: hidden;
            background: ${({ theme }) => theme.darkestBackroundColor};
            margin-top: 10px;

            .link-wrapper {
              width: 220px;
              margin-left: 15px;
            }

            a {
              width: 100%;
            }

            ${() =>
              selected &&
              css`
                display: flex;
                max-height: fit-content;
              `}
          }
        `
      : css`
          .group-links {
            position: absolute;
            top: 85px;
            opacity: 0;
            visibility: hidden;
            width: 250px;
            border-radius: 10px;
            border: 1px solid ${({ theme }) => theme.topBarLinkColor};
          }

          &:hover {
            .group-links {
              opacity: 1;
              visibility: visible;
            }

            .group-name {
              color: ${({ theme }) => theme.topBarLinkColorActive};

              svg {
                stroke: ${({ theme }) => theme.topBarLinkColorActive};
              }
            }
          }
        `}
`
