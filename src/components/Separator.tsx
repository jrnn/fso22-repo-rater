import { StyleSheet, View } from "react-native"
import { theme } from "../theme"

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.regular
  }
})

const Separator = () => (
  <View style={styles.separator} />
)

export default Separator
