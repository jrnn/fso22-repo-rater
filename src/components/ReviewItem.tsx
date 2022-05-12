import { FC } from "react"
import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { theme } from "../theme"
import { Review } from "../types"
import { toYyyyMmDd } from "../util"

const styles = StyleSheet.create({
  bottomGutter: {
    paddingBottom: theme.spacing.dense
  },
  itemContainer: {
    backgroundColor: theme.palette.light,
    display: "flex",
    flexDirection: "row"
  },
  rating: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary,
    borderRadius: 24,
    height: 48,
    width: 48
  },
  ratingContainer: {
    flexGrow: 0,
    padding: theme.spacing.regular
  },
  textContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.spacing.regular
  }
})

interface Props {
  review: Review
}

const ReviewItem: FC<Props> = ({ review }) => (
  <View style={styles.itemContainer}>
    <View style={styles.ratingContainer}>
      <Text color="light" variant="subheading" style={styles.rating}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.textContainer}>
      <Text weight="bold" style={styles.bottomGutter}>
        {review.user.username}
      </Text>
      <Text variant="caption" style={styles.bottomGutter}>
        {toYyyyMmDd(review.createdAt)}
      </Text>
      <Text>
        {review.text}
      </Text>
    </View>
  </View>
)

export default ReviewItem
