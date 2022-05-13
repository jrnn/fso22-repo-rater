import { FC, useState } from "react"
import { StyleSheet, TextInput as NativeTextInput, TextInputProps } from "react-native"
import { theme } from "../theme"

const MIN_HEIGHT = 128

const styles = StyleSheet.create({
  input: {
    borderColor: theme.palette.grey,
    borderWidth: 1,
    height: 48,
    marginBottom: theme.spacing.dense,
    padding: theme.spacing.regular
  },
  invalid: {
    borderColor: theme.palette.error
  }
})

interface Props extends TextInputProps {
  expanding?: boolean
  invalid?: boolean
}

type PropsInternal = Omit<Props, "expanding"> & { invalid: boolean }

const DefaultTextInput: FC<PropsInternal> = ({ invalid, ...props }) => (
  <NativeTextInput
    { ...props }
    style={[
      styles.input,
      invalid && styles.invalid
    ]}
  />
)

const ExpandingTextInput: FC<PropsInternal> = ({ invalid, ...props }) => {
  const [ height, setHeight ] = useState(0)
  return (
    <NativeTextInput
      { ...props }
      multiline
      onContentSizeChange={({ nativeEvent }) => {
        setHeight(nativeEvent.contentSize.height)
      }}
      style={[
        styles.input,
        invalid && styles.invalid,
        { height: Math.max(height, MIN_HEIGHT) }
      ]}
      textAlignVertical="top"
    />
  )
}

const TextInput: FC<Props> = ({
  expanding = false,
  invalid = false,
  ...props
}) => (
  expanding
    ? <ExpandingTextInput { ...props } invalid={invalid} />
    : <DefaultTextInput { ...props } invalid={invalid} />
)

export default TextInput
