import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FIELDS } from "../fragments"
import { Repository, Review } from "../../types"

interface RepositoryResponse {
  repository: Repository & {
    reviews: {
      pageInfo: {
        endCursor: string
        hasNextPage: boolean
      }
      edges: ReadonlyArray<{
        node: Review
      }>
    }
  }
}

interface RepositoryVariables {
  first: number
  after: string
  repositoryId: string
}

const REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query(
    $first: Int,
    $after: String,
    $repositoryId: ID!
  ) {
    repository(
      id: $repositoryId
    ) {
      ...RepositoryFields
      reviews (
        first: $first,
        after: $after
      ){
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
            }
          }
        }
      }
    }
  }
`

/**
 * Runs GraphQL query for a given repository's details and associated reviews.
 */
export const useRepositoryQuery = (variables: RepositoryVariables) =>
  useQuery<RepositoryResponse, RepositoryVariables>(REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network"
  })
