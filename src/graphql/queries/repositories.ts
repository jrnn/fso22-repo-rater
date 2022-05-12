import { gql, useQuery } from "@apollo/client"
import { Repository } from "../../types"

interface RepositoriesResponse {
  repositories: {
    edges: ReadonlyArray<{
      node: Repository
    }>
  }
}

const REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
      }
    }
  }
`

export const useRepositoriesQuery = () =>
  useQuery<RepositoriesResponse>(REPOSITORIES, { fetchPolicy: "cache-and-network" })
