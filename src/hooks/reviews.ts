import { useNotifier } from "../contexts"
import { useMeQuery } from "../graphql"
import { useDeleteReviewMutation } from "../graphql/mutations/deleteReview"
import { Review } from "../types"

export const useMyReviews = (): {
  reviews: ReadonlyArray<Review>,
  fetchNext: () => void
  deleteReview: (id: string) => void
} => {
  const { data, loading, fetchMore, refetch } = useMeQuery({
    getReviews: true,
    first: 5,
    after: ""
  })
  const [ mutate ] = useDeleteReviewMutation()
  const { notifyError, notifySuccess } = useNotifier()

  const reviews = !data?.me
    ? []
    : data.me.reviews.edges.map(edge => edge.node)

  const fetchNext = () => {
    if (!loading && data?.me) {
      const { endCursor, hasNextPage } = data.me.reviews.pageInfo
      if (hasNextPage) {
        fetchMore({
          variables: {
            after: endCursor
          }
        })
      }
    }
  }

  const deleteReview = (deleteReviewId: string) => {
    mutate({
      variables: {
        deleteReviewId
      },
      onCompleted: _ => {
        notifySuccess("Review successfully deleted")
        refetch()
      },
      onError: error => {
        console.log(error)
        notifyError(error.message)
      }
    })
  }

  return { reviews, fetchNext, deleteReview }
}
