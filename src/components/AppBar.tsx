import { StyleSheet, View } from "react-native"
import Constants from "expo-constants"
import AppBarTab from "./AppBarTab"
import { theme } from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.dark,
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight
  }
})

const AppBar = () => (
  <View style={styles.container}>
    <AppBarTab
      label="Repositories"
      onPress={() => {
        console.log("User pressed on 'Repositories'")
      }}
    />
  </View>
)

export default AppBar
