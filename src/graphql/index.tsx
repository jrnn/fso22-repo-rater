import { APOLLO_URI } from "../config"

import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: APOLLO_URI
  })
})

const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export { useAuthenticate } from "./mutations/useAuthenticate"
export { useRepositories } from "./queries/useRepositories"

export default GraphQLProvider
