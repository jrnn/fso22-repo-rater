import { FlatList, Pressable, StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import Separator from "./Separator"
import { useRepositories } from "../hooks"

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5
  }
})

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate()
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.id}`)}
          style={({ pressed }) => [
            pressed && styles.pressed
          ]}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  )
}

export default RepositoryList
