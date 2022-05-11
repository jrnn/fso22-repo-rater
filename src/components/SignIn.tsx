import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Button from "./Button"
import ControlledTextInput from "./ControlledTextInput"
import Notification from "./Notification"
import { useAuthenticate } from "../graphql"
import { theme } from "../theme"

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
  const form = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: ""
    }
  })
  const { authenticate } = useAuthenticate()
  const { formState: { errors }, handleSubmit } = form
  const [ error, setError ] = useState<string>()

  const onSubmit: SubmitHandler<Inputs> = values => {
    authenticate(values, ({ message }) => setError(message))
  }

  return (
    <FormProvider { ...form }>
      {error && <Notification type="error" message={error} />}
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
