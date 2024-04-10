import styled, { css } from 'styled-components/macro'
import { Page } from 'styles'
import { MavenTheme } from 'utils/interfaces'

export const LitepaperStyled = styled(Page)<{ theme: MavenTheme }>`
  font-size: 16px;
  color: ${({ theme }) => theme.subTextColor};
  margin: 0 auto;
  margin-top: 100px;

  p,
  li {
    line-height: 27px;
  }

  table {
    width: 100%;
    margin-bottom: 10px;
    text-align: left;

    th,
    tr {
      height: 36px;
    }
  }

  a {
    color: ${({ theme }) => theme.litepaperLinkColor};
    /* text-decoration: underline; */
  }

  h2 {
    margin: 50px 0 20px 0;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    /* border-bottom: 1px solid #eee; */

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background-color: ${({ theme }) => theme.primaryColor};
      margin: 7px 0 10px 1px;
    }
  }

  h3 {
    margin: 40px 0 20px 0;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 10px;
    /* border-bottom: 1px solid #eee; */

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background-color: ${({ theme }) => theme.primaryColor};
      margin: 7px 0 10px 1px;
    }
  }

  img {
    max-width: 100%;
    margin-bottom: 10px;
  }

  footer > div {
    margin-top: 10px;
  }

  @media (max-width: 700px) {
    p {
      margin-right: 10px;
      white-space: normal;
    }

    table {
      font-size: small;
    }
  }
`

export const LitepaperGrid = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  grid-gap: 30px;
  margin-bottom: 100px;

  @media (max-width: 700px) {
    grid-template-columns: auto;
  }
`

export const LitepaperMarkdown = styled.div`
  > div {
    > img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
`

export const LitepaperIndex = styled.ul`
  font-size: 14px;
  line-height: 14px;
  margin-top: 30px;
  position: fixed;
  width: 260px;
  padding-left: 0;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: rgba(255, 255, 255, 0);
  }

  @media (max-height: 940px) {
    height: calc(100vh - 140px);
  }

  @media (max-width: 700px) {
    display: none;

    > div {
      width: calc(100vw - 70px);
    }
  }

  li {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    line-height: 12px !important;
  }

  li a {
    font-size: 12px;
    color: ${({ theme }) => theme.litepaperLinkColor};
    text-decoration: none;
  }

  li ul {
    padding-left: 20px;
  }
`

export const LitepaperRef = styled.a<{ selected?: boolean }>`
  padding-left: 5px;

  ${(props) =>
    props.selected &&
    css`
      font-weight: bold;
      border-left: 2px solid ${({ theme }) => theme.subTextColor};
    `}
`

export const LitepaperLink = styled.div<{ selected?: boolean }>`
  padding-left: 5px;
  white-space: pre-wrap;

  ${(props) =>
    props.selected &&
    css`
      font-weight: bold;
      border-left: 2px solid ${({ theme }) => theme.subTextColor};
    `}
`
