import { gql, useMutation } from "@apollo/client"
import { Credentials } from "../../types"

interface AuthenticateResponse {
  authenticate: {
    accessToken: string
  }
}

interface AuthenticateVariables {
  credentials: Credentials
}

const AUTHENTICATE = gql`
  mutation (
    $credentials: AuthenticateInput
  ) {
    authenticate(
      credentials: $credentials
    ) {
      accessToken
    }
  }
`

export const useAuthenticateMutation = () =>
  useMutation<AuthenticateResponse, AuthenticateVariables>(AUTHENTICATE)
