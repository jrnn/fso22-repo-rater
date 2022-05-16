import { ComponentType, FC } from "react"
import { FlatList } from "react-native"
import ReviewItem from "./ReviewItem"
import Separator from "../Separator"
import { Review } from "../../types"
import { doNothing } from "../../util"

interface Props {
  HeaderElement?: ComponentType
  isOwner?: boolean
  onDelete?: (id: string) => void
  onEndReached?: () => void
  reviews: ReadonlyArray<Review>
}

const ReviewList: FC<Props> = ({
  HeaderElement,
  isOwner = false,
  onDelete = doNothing,
  onEndReached = doNothing,
  reviews
}) => {
  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      ListHeaderComponent={HeaderElement}
      data={reviews}
      renderItem={({ item }) => <ReviewItem
        isOwner={isOwner}
        onDelete={onDelete}
        review={item}
      />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.25}
    />
  )
}

export default ReviewList
