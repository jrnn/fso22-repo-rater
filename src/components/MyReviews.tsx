import { useMyReviews } from "../hooks"
import ReviewList from "./ReviewList"

const MyReviews = () => {
  const { reviews, fetchNext, deleteReview } = useMyReviews()
  return(
    <ReviewList
      isOwner
      onDelete={deleteReview}
      onEndReached={fetchNext}
      reviews={reviews}
    />
  )
}

export default MyReviews
