import { FC } from "react"
import { StyleSheet } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import Text from "./Text"
import TextInput from "./TextInput"
import { theme } from "../theme"

const styles = StyleSheet.create({
  bottomGutter: {
    marginBottom: theme.spacing.dense
  }
})

interface Props extends Omit<UseControllerProps, "control"> {
  expanding?: boolean
  obscured?: boolean
  placeholder?: string
}

/**
 * Can only be used inside <FormProvider>{ ... }</FormProvider>
 */
const ControlledTextInput: FC<Props> = ({
  expanding = false,
  obscured = false,
  placeholder,
  ...props
}) => (
  <Controller
    { ...props }
    render={({ field: { onBlur, onChange, value }, fieldState: { error }}) => (
      <>
        <TextInput
          expanding={expanding}
          invalid={!!error}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={obscured}
          value={value}
        />
        {error &&
          <Text color="error" style={styles.bottomGutter}>
            {error.message}
          </Text>
        }
      </>
    )}
  />
)

export default ControlledTextInput
