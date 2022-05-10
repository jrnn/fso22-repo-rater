import { FlatList } from "react-native"
import RepositoryItem from "./RepositoryItem"
import Separator from "./Separator"
import { repositories } from "../data"

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  )
}

export default RepositoryList
