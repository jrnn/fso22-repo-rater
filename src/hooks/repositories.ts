import { useRepositoriesQuery } from "../graphql"

export const useRepositories = () => {
  const { data } = useRepositoriesQuery()
  const repositories = !data
    ? []
    : data.repositories.edges.map(edge => edge.node)

  return { repositories }
}
