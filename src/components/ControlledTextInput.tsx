import { FC } from "react"
import { Controller, UseControllerProps } from "react-hook-form"
import TextInput from "./TextInput"
import InputError from "./InputError"

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
        <InputError error={error} />
      </>
    )}
  />
)

export default ControlledTextInput
