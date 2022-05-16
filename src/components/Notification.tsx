import { StyleSheet } from "react-native"
import { useNotification } from "../contexts"
import { theme } from "../theme"
import Container from "./Container"
import Text from "./Text"

const styles = StyleSheet.create({
  success: {
    backgroundColor: theme.palette.success
  },
  error: {
    backgroundColor: theme.palette.error
  }
})

const Notification = () => {
  const { message, type } = useNotification()
  if (type === "none") {
    return null
  }
  return (
    <Container style={[
      type === "success" && styles.success,
      type === "error" && styles.error
    ]}>
      <Text color="light" weight="bold">
        {message}
      </Text>
    </Container>
  )
}

export default Notification
