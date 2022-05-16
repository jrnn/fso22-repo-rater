import { useMyReviews } from "../hooks/reviews"
import ReviewList from "./ReviewList"

const MyReviews = () => {
  const { reviews, fetchNext } = useMyReviews()
  return(
    <ReviewList
      onEndReached={fetchNext}
      reviews={reviews}
    />
  )
}

export default MyReviews
