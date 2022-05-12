import { useNavigate } from "react-router-native"
import { useNotifier } from "../contexts"
import { useCreateReviewMutation, useRepositoriesQuery, useRepositoryQuery } from "../graphql"
import { CreateReviewFormInputs, Repository, Review } from "../types"

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
        console.error(error)
        notifyError(error.message)
      }
    })
  }

  return { createReview }
}
