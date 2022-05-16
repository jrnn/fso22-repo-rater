import { FlatList, Pressable, StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import Container from "../Container"
import RepositoryFilter from "./RepositoryFilter"
import RepositoryItem from "../RepositoryItem"
import RepositorySorter from "./RepositorySorter"
import Separator from "../Separator"
import { useSearchKeyword, useSortingPreference } from "../../contexts"
import { useRepositories } from "../../hooks"
import { theme } from "../../theme"

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.palette.greyLight
  },
  pressed: {
    opacity: 0.5
  }
})

const Header = () => (
  <Container style={styles.header}>
    <RepositoryFilter />
    <RepositorySorter />
  </Container>
)

const RepositoryList = () => {
  const sortBy = useSortingPreference()
  const filterBy = useSearchKeyword()
  const { repositories, fetchNext } = useRepositories(sortBy, filterBy)
  const navigate = useNavigate()

  return (
    <FlatList
      ListHeaderComponent={Header}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      data={repositories}
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
      onEndReached={fetchNext}
      onEndReachedThreshold={0.25}
    />
  )
}

export default RepositoryList
