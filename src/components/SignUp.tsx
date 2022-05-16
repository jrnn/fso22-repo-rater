import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "./Button"
import Container from "./Container"
import ControlledTextInput from "./ControlledTextInput"
import { useSignUp } from "../hooks"
import { Credentials } from "../types"
import { isEmpty } from "../util"

const schema = yup.object().shape({
  username: yup.string()
    .min(1, "Username must have at least 1 character")
    .max(30, "Username must have less than 30 characters"),
  password: yup.string()
    .min(5, "Password must have at least 5 characters")
    .max(50, "Password must have less than 50 characters"),
  confirmPassword: yup.string()
    .oneOf([ yup.ref("password") ], "Passwords do not match")
})

type Inputs = Credentials & {
  confirmPassword: string
}

const SignUp = () => {
  const { signUp } = useSignUp()
  const form = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  })
  const { formState: { errors }, handleSubmit } = form
  const onSubmit: SubmitHandler<Inputs> = ({ confirmPassword, ...credentials }) => signUp(credentials)

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
        <ControlledTextInput
          name="confirmPassword"
          obscured
          placeholder="Confirm password"
        />
        <Button
          disabled={!isEmpty(errors)}
          label="SIGN UP"
          onPress={handleSubmit(onSubmit)}
        />
      </Container>
    </FormProvider>
  )
}

export default SignUp
