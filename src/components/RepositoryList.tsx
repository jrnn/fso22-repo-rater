import { FlatList, Pressable, StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import RepositorySorter from "./RepositorySorter"
import Separator from "./Separator"
import { useSortingPreference } from "../contexts"
import { useRepositories } from "../hooks"

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5
  }
})

const RepositoryList = () => {
  const sortBy = useSortingPreference()
  const { repositories } = useRepositories(sortBy)
  const navigate = useNavigate()
  return (
    <FlatList
      ListHeaderComponent={() => <RepositorySorter />}
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
