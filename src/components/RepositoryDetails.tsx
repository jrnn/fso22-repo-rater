import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useParams } from "react-router-native"
import * as Linking from "expo-linking"
import Button from "./Button"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"
import { useRepositories } from "../hooks"
import { theme } from "../theme"
import { Repository } from "../types"

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.palette.light,
    padding: theme.spacing.regular
  }
})

interface Props {
  repository: Repository
}

const RepositoryDetailsInternal: FC<Props> = ({ repository }) => (
  <View>
    <RepositoryItem repository={repository} />
    <View style={styles.buttonContainer}>
      <Button
        label="Open in GitHub"
        onPress={() => Linking.openURL(repository.url)}
      />
    </View>
  </View>
)

const RepositoryDetails = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    throw new Error("RepositoryDetails must be bound to a route ending with '.../:id'")
  }
  const data = useRepositories()
  const repository = data.repositories.find(r => r.id === id)
  return (
    !repository ?
      <Text>404</Text> :
      <RepositoryDetailsInternal repository={repository} />
  )
}

export default RepositoryDetails
