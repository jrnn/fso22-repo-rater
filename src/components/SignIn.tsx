import { StyleSheet, View } from "react-native"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Button from "./Button"
import ControlledTextInput from "./ControlledTextInput"
import { useSignIn } from "../hooks"
import { theme } from "../theme"
import { isEmpty } from "../util"

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.regular
  }
})

interface Inputs {
  username: string
  password: string
}

const SignIn = () => {
  const { signIn } = useSignIn()
  const form = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: ""
    }
  })
  const { formState: { errors }, handleSubmit } = form
  const onSubmit: SubmitHandler<Inputs> = credentials => signIn(credentials)

  return (
    <FormProvider { ...form }>
      <View style={styles.container}>
        <ControlledTextInput
          name="username"
          placeholder="Username"
          rules={{
            required: true
          }}
        />
        <ControlledTextInput
          name="password"
          obscured
          placeholder="Password"
          rules={{
            required: true
          }}
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
