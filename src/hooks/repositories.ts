import { useNavigate } from "react-router-native"
import { SortingPreference, useNotifier } from "../contexts"
import { useCreateReviewMutation, useRepositoriesQuery, useRepositoryQuery } from "../graphql"
import { CreateReviewFormInputs, Repository, Review } from "../types"

/**
 * Fetches the basic details of all repositories. Doesn't really do anything on
 * top of abstracting away the GraphQL specifics (incl. response structure).
 */
export const useRepositories = (sortBy: SortingPreference, filterBy: string): {
  repositories: ReadonlyArray<Repository>
  fetchNext: () => void
} => {
  const { data, loading, fetchMore } = useRepositoriesQuery({
    first: 5,
    after: "",
    orderBy: sortBy === "latest" ? "CREATED_AT" : "RATING_AVERAGE",
    orderDirection: sortBy === "lowestRated" ? "ASC" : "DESC",
    searchKeyword: filterBy
  })
  const repositories = !data
    ? []
    : data.repositories.edges.map(edge => edge.node)

  const fetchNext = () => {
    if (!loading && data) {
      const { endCursor, hasNextPage } = data.repositories.pageInfo
      if (hasNextPage) {
        fetchMore({
          variables: {
            after: endCursor
          }
        })
      }
    }
  }
  return { repositories, fetchNext }
}

/**
 * Fetches a given repository's data more extensively. Conceals GraphQL
 * specifics. The repository details and its reviews are destructured from the
 * edgy-nody response for ease of access.
 */
export const useRepository = (repositoryId: string): {
  repository: Repository | undefined
  reviews: ReadonlyArray<Review>
  fetchNext: () => void
} => {
  const { data, loading, fetchMore } = useRepositoryQuery({
    first: 5,
    after: "",
    repositoryId
  })
  const fetchNext = () => {
    if (!loading && data) {
      const { endCursor, hasNextPage } = data.repository.reviews.pageInfo
      if (hasNextPage) {
        fetchMore({
          variables: {
            after: endCursor
          }
        })
      }
    }
  }
  return {
    repository: data?.repository,
    reviews: data?.repository.reviews.edges.map(edge => edge.node) || [],
    fetchNext
  }
}

/**
 * Primes a function for creating a new review, including the side-effects in
 * success vs. failure scenarios. Caller doesn't need to worry about GraphQL.
 */
export const useCreateReview = () => {
  const navigate = useNavigate()
  const [ mutate ] = useCreateReviewMutation()
  const { notifyError, notifySuccess } = useNotifier()

  const createReview = (input: CreateReviewFormInputs) => {
    const { rating, text, ...inputs } = input
    const review = !text ?
      {
        ...inputs,
        rating: Number(rating)
      } :
      {
        ...inputs,
        rating: Number(rating),
        text
      }

    mutate({
      variables: { review },
      onCompleted: data => {
        notifySuccess("Successfully created new review")
        navigate(`/repositories/${data.createReview.repositoryId}`, { replace: true })
      },
      onError: error => {
        console.log(error)
        notifyError(error.message)
      }
    })
  }

  return { createReview }
}
