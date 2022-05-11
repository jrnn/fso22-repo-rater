import { FC } from "react"
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native"
import Text from "./Text"
import { theme } from "../theme"
import { doNothing } from "../util"

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: theme.palette.primary,
    padding: theme.spacing.regular
  },
  disabled: {
    backgroundColor: theme.palette.greyLight
  },
  pressed: {
    backgroundColor: theme.palette.primaryLight
  }
})

interface Props {
  disabled?: boolean
  label: string
  onPress?: (event: GestureResponderEvent) => void
}

const Button: FC<Props> = ({ disabled = false, label, onPress }) => (
  <Pressable
    onPress={disabled ? doNothing : onPress}
    style={({ pressed }) => [
      styles.button,
      pressed && styles.pressed,
      disabled && styles.disabled
    ]}
  >
    <Text color="light" weight="bold">
      {label}
    </Text>
  </Pressable>
)

export default Button
