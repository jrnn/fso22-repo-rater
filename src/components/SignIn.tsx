import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "./Button"
import Container from "./Container"
import ControlledTextInput from "./ControlledTextInput"
import { useSignIn } from "../hooks"
import { Credentials } from "../types"
import { isEmpty } from "../util"

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
      <Container>
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
      </Container>
    </FormProvider>
  )
}

export default SignIn
