import { StyleSheet, View } from "react-native"
import { useNotification } from "../contexts"
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

const Notification = () => {
  const { message, type } = useNotification()
  if (type === "none") {
    return null
  }
  return (
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
}

export default Notification
