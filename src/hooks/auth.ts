import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-native"
import { useAuthStorage, useNotifier } from "../contexts"
import { useAuthenticateMutation, useCreateUserMutation, useMeQuery } from "../graphql"
import { Credentials } from "../types"

export const useWhoAmI = () => {
  const { data } = useMeQuery()
  return !data
    ? undefined
    : data.me?.username
}

export const useSignIn = () => {
  const apolloClient = useApolloClient()
  const navigate = useNavigate()
  const [ mutate ] = useAuthenticateMutation()
  const { setAccessToken } = useAuthStorage()
  const { notifyError, notifySuccess } = useNotifier()

  const signIn = (credentials: Credentials) => {
    mutate({
      variables: {
        credentials
      },
      onCompleted: async data => {
        await setAccessToken(data.authenticate.accessToken)
        apolloClient.resetStore()
        notifySuccess("You are now signed in")
        navigate("/", { replace: true })
      },
      onError: error => {
        console.log(error)
        notifyError("Invalid username or password")
      }
    })
  }

  return { signIn }
}

export const useSignOut = () => {
  const apolloClient = useApolloClient()
  const { removeAccessToken } = useAuthStorage()
  const { notifySuccess } = useNotifier()

  const signOut = async () => {
    await removeAccessToken()
    apolloClient.resetStore()
    notifySuccess("You are now signed out")
  }

  return { signOut }
}

export const useSignUp = () => {
  const [ mutate ] = useCreateUserMutation()
  const { signIn } = useSignIn()
  const { notifyError } = useNotifier()

  const signUp = (credentials: Credentials) => {
    mutate({
      variables: {
        user: credentials
      },
      onCompleted: _ => {
        signIn(credentials)
      },
      onError: error => {
        console.log(error)
        notifyError(error.message)
      }
    })
  }

  return { signUp }
}
