import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { theme } from "../theme"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.regular
  },
  notification: {
    borderWidth: 1,
    padding: theme.spacing.regular
  },
  success: {
    borderColor: theme.palette.success
  },
  error: {
    borderColor: theme.palette.error
  }
})

interface Props {
  type: "success" | "error"
  message: string
}

const Notification: FC<Props> = ({ type, message }) => (
  <View style={styles.container}>
    <View style={[
      styles.notification,
      type === "success" && styles.success,
      type === "error" && styles.error
    ]}>
      <Text color={type} weight="bold">
        {message}
      </Text>
    </View>
  </View>
)

export default Notification
