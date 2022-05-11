import { gql, useQuery } from "@apollo/client"

interface MeResponse {
  me?: {
    id: string
    username: string
  }
}

const ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const useMeQuery = () =>
  useQuery<MeResponse>(ME, { fetchPolicy: "no-cache" })
