import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FIELDS } from "../fragments"
import { Repository } from "../../types"

interface RepositoriesResponse {
  repositories: {
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
    edges: ReadonlyArray<{
      node: Repository
    }>
  }
}

interface RepositoriesVariables {
  first: number
  after: string
  orderBy: "CREATED_AT" | "RATING_AVERAGE"
  orderDirection: "ASC" | "DESC"
  searchKeyword: string
}

const REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query (
    $first: Int,
    $after: String,
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String
  ) {
    repositories(
      first: $first,
      after: $after,
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }
`

/**
 * Runs GraphQL query for basic details of all repositories.
 */
export const useRepositoriesQuery = (variables: RepositoriesVariables) =>
  useQuery<RepositoriesResponse, RepositoriesVariables>(REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network"
  })
