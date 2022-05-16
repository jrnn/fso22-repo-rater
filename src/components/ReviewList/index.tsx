import { ComponentType, FC } from "react"
import { FlatList } from "react-native"
import ReviewItem from "./ReviewItem"
import Separator from "../Separator"
import { Review } from "../../types"

interface Props {
  HeaderElement?: ComponentType
  onEndReached?: () => void
  reviews: ReadonlyArray<Review>
}

const ReviewList: FC<Props> = ({ HeaderElement, onEndReached, reviews }) => {
  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      ListHeaderComponent={HeaderElement}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.25}
    />
  )
}

export default ReviewList
