import { gql, useMutation } from "@apollo/client"
import { Credentials } from "../../types"

interface CreateUserResponse {
  createUser: {
    id: string
  }
}

interface CreateUserVariables {
  user: Credentials
}

const CREATE_USER = gql`
  mutation (
    $user: CreateUserInput
  ) {
    createUser(
      user: $user
    ) {
      id
    }
  }
`

export const useCreateUserMutation = () =>
  useMutation<CreateUserResponse, CreateUserVariables>(CREATE_USER)
