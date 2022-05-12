import { FC } from "react"
import { StyleSheet } from "react-native"
import { FieldError } from "react-hook-form"
import Text from "./Text"
import { theme } from "../theme"

const styles = StyleSheet.create({
  bottomGutter: {
    marginBottom: theme.spacing.dense
  }
})

interface Props {
  error: FieldError | undefined
}

const interpretError = ({ type }: FieldError): string => {
  console.log(type)
  switch (type) {
    case "required":
      return "Cannot be empty"
    case "rating":
      return "Must be an integer between 0 and 100"
    default:
      return "Something's wrong here"
  }
}

const InputError: FC<Props> = ({ error }) => (
  !error ?
    null : (
      <Text color="error" style={styles.bottomGutter}>
        {interpretError(error)}
      </Text>
    )
)

export default InputError
