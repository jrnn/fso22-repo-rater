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
  const { repositories } = useRepositories(sortBy, filterBy)
  const navigate = useNavigate()

  return (
    <FlatList
      ListHeaderComponent={Header}
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
