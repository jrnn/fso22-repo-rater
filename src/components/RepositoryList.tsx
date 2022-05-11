import { FlatList } from "react-native"
import RepositoryItem from "./RepositoryItem"
import Separator from "./Separator"
import { useRepositories } from "../hooks"

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
