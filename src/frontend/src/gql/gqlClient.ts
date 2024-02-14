import {GraphQLClient} from 'graphql-request'

export const MavrykGqlClient = new GraphQLClient('https://api.mavenfinance.io/v1/graphql')
export const DexGqlClient = new GraphQLClient('https://dex.dipdup.net/v1/graphql')
