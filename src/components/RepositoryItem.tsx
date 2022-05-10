import { FC } from "react"
import { Text, View } from "react-native"
import { Repository } from "../types"

interface Props {
  repository: Repository
}

const RepositoryItem: FC<Props> = ({ repository }) => {
  return (
    <View>
      <Text>Full name: {repository.fullName}</Text>
      <Text>Description: {repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
    </View>
  )
}

export default RepositoryItem
