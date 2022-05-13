import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FIELDS } from "../fragments"
import { Repository } from "../../types"

interface RepositoriesResponse {
  repositories: {
    edges: ReadonlyArray<{
      node: Repository
    }>
  }
}

interface RepositoriesVariables {
  orderBy: "CREATED_AT" | "RATING_AVERAGE"
  orderDirection: "ASC" | "DESC"
}

const REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection
  ) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection
    ) {
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
