# Maven Frontend Agent Guide

## Sources Of Truth

- Verify monorepo scripts and package orchestration in `package.json` and `lerna.json`.
- Verify frontend scripts, dependencies, CRA/CRACO behavior, and Webpack fallbacks in `src/frontend/package.json` and `src/frontend/craco.config.js`.
- Verify TypeScript settings in `src/frontend/tsconfig.json`.
- Verify app composition in `src/frontend/src/index.tsx` and route wiring in `src/frontend/src/app/App.controller.tsx`.
- Verify Redux state shape and dispatch types in `src/frontend/src/utils/interfaces.ts`, `src/frontend/src/redux/action.types.ts`, `src/frontend/src/redux/reducers.ts`, and `src/frontend/src/redux/storeConfigurator.ts`.
- Verify wallet, RPC, and transaction flow in `src/frontend/src/redux/actions/connectWallet.actions.tsx`, `src/frontend/src/redux/actions/swap.action.ts`, `src/frontend/src/redux/actions/liquidity.action.ts`, `src/frontend/src/redux/reducers/preferences.ts`, and `src/frontend/src/utils/validatorFunctions.ts`.
- Verify GraphQL clients, fetchers, and queries in `src/frontend/src/gql/*`.
- Verify theme tokens, global styles, and shared layout primitives in `src/frontend/src/styles/*`.
- Verify static images, icons, token metadata, and contract metadata in `src/frontend/public/*`.
- Verify the Medium feed helper server in `server/node-server.js`.

## Current Stack

- Node `^22.0.0` is the expected runtime; `.nvmrc` is pinned to major `22`.
- Lerna `6.x` monorepo with packages under `src/*`; root scripts run package scripts through Yarn.
- Frontend: React `19.2.x`, React DOM `19.2.x`, Create React App / `react-scripts` `5.0.x`.
- TypeScript `5.9.x` with `strict: true`, `allowJs: true`, `skipLibCheck: true`, `noEmit: true`, and `baseUrl: "src"`.
- Routing: `react-router` `7.x`; this app imports router APIs from `react-router`, not `react-router-dom`.
- State: Redux `5.x`, `react-redux` `9.x`, `redux-thunk` `3.x`.
- Data: `swr` `2.x`, `graphql-request` `7.x`, `axios` `1.x`.
- Blockchain: Mavryk Taquito `20.x`, `@mavrykdynamics/beacon-dapp`, `@mavrykdynamics/taquito-beacon-wallet`, and `@mavrykdynamics/taquito-rpc`.
- Styling: `styled-components` `6.x` through the main `styled-components` entry; no `styled-components/macro` and no Tailwind in this repo.
- Server helper: Node ESM HTTP server using `dotenv`, `jsdom`, and `xml2js`.

## Project Shape

- `package.json`: root Lerna scripts, lint/prettier setup, and postinstall bootstrap.
- `src/frontend/`: CRA app package, lockfile, public assets, and frontend source.
- `src/frontend/craco.config.js`: CRA 5 Webpack fallbacks for Beacon/Taquito browser builds.
- `src/frontend/src/index.tsx`: root provider composition with `SWRConfig`, Redux, theme provider, parallax provider, global styles, and `App`.
- `src/frontend/src/app/App.controller.tsx`: router, active route list, global loader, toaster, store export, and dispatch types.
- `src/frontend/src/app/App.components/`: shared UI components. Most components follow `*.controller.tsx`, `*.view.tsx`, and `*.style.tsx`.
- `src/frontend/src/pages/`: route-level screens. Active routes currently include Home, Litepaper, Privacy, and `/404`; Liquidity Baking and Bakery code exists, but route/header links are commented.
- `src/frontend/src/redux/`: action constants, thunk action creators, reducers, and store configuration.
- `src/frontend/src/gql/`: GraphQL clients, fetch helpers, and query documents.
- `src/frontend/src/utils/`: domain helpers, environment constants, DEX math, validators, token display, and shared types.
- `src/frontend/src/styles/`: theme definitions, global styles, shared style primitives, and font declarations.
- `src/frontend/public/`: CRA public files, images, icons, diagrams, token metadata, and contract metadata.
- `server/`: standalone Medium API/feed helper server.

## Architecture And Boundaries

- Keep route wiring in `src/frontend/src/app/App.controller.tsx`. Do not add route-level branching inside shared components.
- Use React Router v7 route elements and navigation APIs. Prefer `Navigate`, `Routes`, `Route`, `Link`, `useLocation`, and `useNavigate` from `react-router`.
- Use the local `src/frontend/src/app/App.components/HashLink/HashLink.view.tsx` wrapper for same-page hash scrolling instead of re-adding `react-router-hash-link`.
- Keep app bootstrap providers in `src/frontend/src/index.tsx`. Add cross-cutting providers there only when they are truly app-wide.
- Keep reusable UI under `src/frontend/src/app/App.components`. Keep page-specific sections under the owning `src/frontend/src/pages/<Page>/components` directory.
- Preserve the controller/view/style split when changing existing components. Controllers own state/effects/dispatch; views own JSX composition; style files own styled-components.
- Keep Redux action constants in `src/frontend/src/redux/action.types.ts`, reducers in `src/frontend/src/redux/reducers/*`, and global state types in `src/frontend/src/utils/interfaces.ts`.
- Use the existing `State`, `AppDispatch`, and `GetState` types instead of broad `any` when adding Redux code.
- Use `useAppDispatch` from `src/frontend/src/app/App.hooks.ts` for thunk dispatch in React components.
- Keep GraphQL endpoint definitions and request helpers in `src/frontend/src/gql/gqlClient.ts` and `src/frontend/src/gql/gql.helpers.ts`. Put query documents in `src/frontend/src/gql/queries`.
- Use existing SWR fetchers (`mavrykGqlFetcher`, `dexGqlFetcher`) instead of ad hoc fetch logic in render code.
- Keep wallet connection behavior in `connectWallet.actions.tsx`. Reuse `WalletOptions`, `network`, and `checkIfWalletIsConnected` for Mavryk Beacon flows.
- Keep RPC node defaults and selected RPC state in `redux/reducers/preferences.ts`; the default Mavryk network is Atlasnet (`https://atlasnet.rpc.mavryk.network`) and custom RPC nodes are validated through `utils/validatorFunctions.ts`.
- Liquidity Baking transaction code lives in `redux/actions/swap.action.ts` and `redux/actions/liquidity.action.ts`; UI orchestration lives under `pages/LiquidityBaking`.
- Mavryk Taquito `20.x` wallet contract calls use `methodsObject` object-parameter entrypoints. Do not reintroduce removed `contract.methods` calls.
- DEX calculations belong in `src/frontend/src/utils/DEX/*`; do not duplicate swap/liquidity math in components.
- Existing contract constants are in `swap.action.ts`, with local duplicates in `liquidity.action.ts`. Do not add another duplicate; centralize or reuse before extending contract references.
- User balances and stats are loaded through Redux actions such as `user.action.ts`, `stats.action.ts`, `chart.action.ts`, and `tokenPrices.action.ts`; avoid direct API calls from page JSX.
- Toast user-facing wallet, RPC, API, and transaction errors through the existing toaster actions. Do not silently swallow failures.
- The `server/` package is separate from the CRA app. Keep Medium API/feed behavior in `server/node-server.js` unless the frontend contract changes.

## Styling Rules

- Use `styled-components` and existing theme tokens from `src/frontend/src/styles/colors.ts`.
- Theme typing is declared in `src/frontend/src/styles/styled.d.ts`; avoid adding `{ theme: MavenTheme }` props unless the component also has real custom props.
- Use `GlobalStyle` and shared primitives from `src/frontend/src/styles/*` before adding new global CSS.
- Preserve the existing Maven visual language: space/dark theme, cyan/purple accents, gradients, and asset-heavy landing sections.
- `DarkThemeProvider` currently maps non-light themes to `spaceMode`; account for that when adding theme-dependent styles.
- Put static assets in `src/frontend/public` and reference existing images/icons before adding new assets.
- Use the existing icon/sprite setup in `src/frontend/public/icons/sprites.svg` and `App.components/Icon` before creating new icon plumbing.
- Keep responsive behavior inside the touched component's existing styled-component patterns.

## Coding Rules

- Be concise and factual. No fluff.
- Follow DRY and SRP. Prefer modular, reusable code.
- Match existing naming, formatting, imports, and file layout.
- Use proper TypeScript types. Avoid broad `any`; do not expand existing implicit `any` usage unless required by the task.
- Handle wallet, RPC, API, GraphQL, and contract failures explicitly.
- Prefer readability over cleverness. Do not overengineer.
- Do not break existing APIs, route props, Redux state shape, component props, or public assets unless asked.
- Reuse existing helpers before creating new ones.
- Keep generated/build output such as `src/frontend/build` out of normal source edits unless explicitly requested.
- After code changes, include a `Documentation Update` section when doc changes are applicable.

## Project Commands

- Root install/bootstrap: `npm install` runs `lerna bootstrap` via `postinstall`; Lerna `7+` removes this legacy command, so do not upgrade past Lerna `6.x` without migrating package linking.
- Root start all packages: `npm run start`.
- Root build all packages: `npm run build`.
- Root test all packages: `npm run test`.
- Root lint JS/JSX: `npm run lint`.
- Root lint fix: `npm run lint:fix`.
- Root prettier check: `npm run prettier`.
- Frontend start: `cd src/frontend && yarn start` (`craco start` under the hood).
- Frontend OpenSSL fallback: `cd src/frontend && yarn start:evenlop`.
- Frontend build: `cd src/frontend && yarn build` (`craco build` under the hood).
- Frontend test: `cd src/frontend && yarn test` (`craco test` under the hood).
- Frontend bundle analyze: `cd src/frontend && yarn analyze`.
- Server start: `cd server && npm run serve`.

## Local Skills

- No repo-local `.codex/skills` or `.agents/plugins` directory was found when this guide was created.
- Do not assume project-local skills exist. Add them here if this repo gains local agent skills or plugin metadata.

## AGENTS Maintenance Protocol

- Update this file when scripts, package structure, route wiring, wallet/RPC flow, GraphQL endpoints, DEX transaction boundaries, styling system, server behavior, or local skills change.
- Keep references concrete and path-based. Remove stale paths when files move.
