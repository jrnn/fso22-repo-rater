import { FC } from "react"
import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native"
import Text from "./Text"
import { theme } from "../theme"

const styles = StyleSheet.create({
  container: {
    flexGrow: 0
  },
  tab: {
    padding: theme.spacing.regular
  }
})

interface Props {
  onPress: (event: GestureResponderEvent) => void
  label: string
}

const AppBarTab: FC<Props> = ({ label, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [ pressed && {
          backgroundColor: theme.palette.primary
        }]}
      >
        <Text
          color="light"
          style={styles.tab}
          variant="subheading"
          weight="bold"
        >
          {label}
        </Text>
      </Pressable>
    </View>
  )
}

export default AppBarTab
