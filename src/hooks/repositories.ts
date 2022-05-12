import { useRepositoriesQuery, useRepositoryQuery } from "../graphql"
import { Repository, Review } from "../types"

/**
 * Fetches the basic details of all repositories. Doesn't really do anything on
 * top of abstracting away the GraphQL specifics (incl. response structure).
 */
export const useRepositories = (): {
  repositories: ReadonlyArray<Repository>
} => {
  const { data } = useRepositoriesQuery()
  const repositories = !data
    ? []
    : data.repositories.edges.map(edge => edge.node)

  return { repositories }
}

/**
 * Fetches a given repository's data more extensively. Conceals GraphQL
 * specifics. The repository details and its reviews are destructured from the
 * edgy-nody response for ease of access.
 */
export const useRepository = (repositoryId: string): {
  repository?: Repository
  reviews: ReadonlyArray<Review>
} => {
  const { data } = useRepositoryQuery(repositoryId)
  if (!data) {
    return {
      reviews: []
    }
  }
  const repository = data.repository
  const reviews = repository.reviews.edges.map(edge => edge.node)
  return { repository, reviews }
}
