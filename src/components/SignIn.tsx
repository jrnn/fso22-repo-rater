import { StyleSheet, View } from "react-native"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { theme } from "../theme"
import Button from "./Button"
import ControlledTextInput from "./ControlledTextInput"

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
  const form = useForm<Inputs>()
  const { formState: { errors }, handleSubmit } = form
  const onSubmit: SubmitHandler<Inputs> = values => {
    console.log("sign-in form values =", values)
  }
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
          disabled={Object.keys(errors).length > 0}
          label="SIGN IN"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </FormProvider>
  )
}

export default SignIn
