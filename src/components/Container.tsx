import { FC, PropsWithChildren } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { theme } from "../theme"

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.regular
  }
})

interface Props extends PropsWithChildren<unknown> {
  style?: StyleProp<ViewStyle>
}

const Container: FC<Props> = ({ style, children }) => (
  <View
    style={[
      styles.container,
      style
    ]}
  >
    {children}
  </View>
)

export default Container
