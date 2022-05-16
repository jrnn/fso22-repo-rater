import { FC } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native"
import Button from "../Button"
import Container from "../Container"
import Text from "../Text"
import { theme } from "../../theme"
import { Review } from "../../types"
import { toYyyyMmDd } from "../../util"

const styles = StyleSheet.create({
  bottomGutter: {
    paddingBottom: theme.spacing.dense
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    backgroundColor: theme.palette.light
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row"
  },
  rating: {
    flex: 0,
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
  isOwner: boolean
  onDelete: (id: string) => void
  review: Review
}

const ReviewInfo: FC<Review> = ({ createdAt, rating, text, user }) => (
  <View style={styles.infoContainer}>
    <View style={styles.ratingContainer}>
      <View style={styles.rating}>
        <Text color="light" variant="subheading">
          {rating}
        </Text>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text weight="bold" style={styles.bottomGutter}>
        {user.username}
      </Text>
      <Text variant="caption" style={styles.bottomGutter}>
        {toYyyyMmDd(createdAt)}
      </Text>
      <Text>
        {text}
      </Text>
    </View>
  </View>
)

const Buttons: FC<{ review: Review, deleteReview: () => void }> = ({ deleteReview, review }) => {
  const navigate = useNavigate()
  return (
    <Container style={styles.buttonContainer}>
      <Button
        label="View repository"
        onPress={() => navigate(`/repositories/${review.repository.id}`)}
      />
      <Button
        label="Delete review"
        variant="warning"
        onPress={() => {
          Alert.alert(
            "Delete review",
            "Are you sure? This cannot be undone.",
            [
              {
                text: "Delete",
                style: "default",
                onPress: deleteReview
              },
              {
                text: "Cancel",
                style: "cancel"
              }
            ]
          )
        }}
      />
    </Container>
  )
}

const ReviewItem: FC<Props> = ({ isOwner, onDelete, review }) => (
  <View style={styles.container}>
    <ReviewInfo { ...review } />
    {isOwner && <Buttons review={review} deleteReview={() => onDelete(review.id)} />}
  </View>
)

export default ReviewItem
