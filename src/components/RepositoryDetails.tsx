import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useParams } from "react-router-native"
import * as Linking from "expo-linking"
import Button from "./Button"
import RepositoryItem from "./RepositoryItem"
import ReviewList from "./ReviewList"
import Separator from "./Separator"
import Text from "./Text"
import { useRepository } from "../hooks"
import { theme } from "../theme"
import { Repository } from "../types"

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.palette.light,
    padding: theme.spacing.regular
  }
})

const RepositoryDetailsHeader: FC<{ repository: Repository }> = ({ repository }) => (
  <View>
    <RepositoryItem repository={repository} />
    <View style={styles.buttonContainer}>
      <Button
        label="OPEN IN GITHUB"
        onPress={() => Linking.openURL(repository.url)}
      />
    </View>
    <Separator />
  </View>
)

const RepositoryDetails = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    throw new Error("RepositoryDetails must be bound to a route ending with '.../:id'")
  }
  const { repository, reviews, fetchNext } = useRepository(id)
  if (!repository) {
    return <Text>404</Text>
  }
  return (
    <ReviewList
      HeaderElement={() => <RepositoryDetailsHeader repository={repository} />}
      onEndReached={fetchNext}
      reviews={reviews}
    />
  )
}

export default RepositoryDetails
