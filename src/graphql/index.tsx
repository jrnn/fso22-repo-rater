import { APOLLO_URI } from "../config"
import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { AuthStorage, useAuthStorage } from "../contexts"

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: APOLLO_URI
})

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await authStorage.getAccessToken()
      if (token) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
    return { headers }
  })
  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink)
  })
}

export const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const authStorage = useAuthStorage()
  const client = createApolloClient(authStorage)
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export { useAuthenticateMutation } from "./mutations/authenticate"
export { useMeQuery } from "./queries/me"
export { useRepositoriesQuery } from "./queries/repositories"
export { useRepositoryQuery } from "./queries/repository"
