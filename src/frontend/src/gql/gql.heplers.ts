import { ENVIRONMENT } from "../utils/consts"

async function fetchGraphQL(operationsDoc: string, operationName: string, variables: Record<string, any>, gqlNetwork?: string) {
  const developmentAPI = gqlNetwork || ENVIRONMENT.gqlLink
  const prodictionAPI = gqlNetwork || ENVIRONMENT.gqlLink
  const gqlAPINetwork = process.env.NODE_ENV === 'development' ? developmentAPI : prodictionAPI

  return new Promise<any>((resolve, reject) => {
    fetch(gqlAPINetwork, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err))
  })
}

export async function fetchFromIndexer(operationsDoc: string, operationName: string, variables: Record<string, any>, gqlNetwork?: string) {
  return await fetchGraphQL(operationsDoc, operationName, variables, gqlNetwork)
    .then(({ data, errors }: any) => {
      if (errors) {
        console.error(errors)
      }
      return data
    })
    .catch((error: any) => {
      console.error(error)
      return error
    })
}
