import { StyleSheet, View } from "react-native"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "./Button"
import ControlledTextInput from "./ControlledTextInput"
import { useSignIn } from "../hooks"
import { theme } from "../theme"
import { Credentials } from "../types"
import { isEmpty } from "../util"

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.regular
  }
})

const schema = yup.object().shape({
  username: yup.string().required("Username cannot be empty"),
  password: yup.string().required("Password cannot be empty")
})

const SignIn = () => {
  const { signIn } = useSignIn()
  const form = useForm<Credentials>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: ""
    }
  })
  const { formState: { errors }, handleSubmit } = form
  const onSubmit: SubmitHandler<Credentials> = credentials => signIn(credentials)

  return (
    <FormProvider { ...form }>
      <View style={styles.container}>
        <ControlledTextInput
          name="username"
          placeholder="Username"
        />
        <ControlledTextInput
          name="password"
          obscured
          placeholder="Password"
        />
        <Button
          disabled={!isEmpty(errors)}
          label="SIGN IN"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </FormProvider>
  )
}

export default SignIn
