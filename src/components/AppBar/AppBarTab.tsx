import { FC } from "react"
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native"
import Text from "../Text"
import { theme } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flexGrow: 0
  },
  pressed: {
    backgroundColor: theme.palette.primary
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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
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
  )
}

export default AppBarTab
