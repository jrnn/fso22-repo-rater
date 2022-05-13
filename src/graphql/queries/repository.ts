import { gql, useQuery } from "@apollo/client"
import { REPOSITORY_FIELDS } from "../fragments"
import { Repository, Review } from "../../types"

interface RepositoryResponse {
  repository: Repository & {
    reviews: {
      edges: ReadonlyArray<{
        node: Review
      }>
    }
  }
}

interface RepositoryVariables {
  repositoryId: string
}

const REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query(
    $repositoryId: ID!
  ) {
    repository(
      id: $repositoryId
    ) {
      ...RepositoryFields
      reviews {
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
export const useRepositoryQuery = (repositoryId: string) =>
  useQuery<RepositoryResponse, RepositoryVariables>(REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId }
  })
