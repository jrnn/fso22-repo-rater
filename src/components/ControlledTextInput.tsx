import { FC } from "react"
import { StyleSheet, TextInput } from "react-native"
import { Controller, FieldError, UseControllerProps } from "react-hook-form"
import Text from "./Text"
import { theme } from "../theme"

const styles = StyleSheet.create({
  bottomGutter: {
    marginBottom: theme.spacing.dense
  },
  input: {
    borderColor: theme.palette.grey,
    borderWidth: 1,
    height: 48,
    padding: theme.spacing.regular
  },
  invalid: {
    borderColor: theme.palette.error
  }
})

interface Props extends Omit<UseControllerProps, "control"> {
  obscured?: boolean
  placeholder?: string
}

const interpretError = ({ type }: FieldError): string => {
  switch (type) {
    case "required":
      return "Cannot be empty"
    default:
      return "Something's wrong here"
  }
}

/**
 * Can only be used inside <FormProvider>{ ... }</FormProvider>
 */
const ControlledTextInput: FC<Props> = ({ placeholder, obscured = false, ...props }) => (
  <Controller
    { ...props }
    render={({ field: { onBlur, onChange, value }, fieldState: { error }}) => (
      <>
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={obscured}
          style={[
            styles.input,
            styles.bottomGutter,
            error && styles.invalid
          ]}
          value={value}
        />
        {error && <Text color="error" style={styles.bottomGutter}>
          {interpretError(error)}
        </Text>}
      </>
    )}
  />
)

export default ControlledTextInput
