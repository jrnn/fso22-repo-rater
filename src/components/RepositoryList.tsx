import { FlatList } from "react-native"
import { useRepositories } from "../graphql"
import RepositoryItem from "./RepositoryItem"
import Separator from "./Separator"

const RepositoryList = () => {
  const { repositories } = useRepositories()
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  )
}

export default RepositoryList
