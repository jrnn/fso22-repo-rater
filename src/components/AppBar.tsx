import { StyleSheet, View } from "react-native"
import Constants from "expo-constants"
import AppBarTab from "./AppBarTab"
import { theme } from "../theme"
import { useNavigate } from "react-router-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.dark,
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight
  }
})

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <View style={styles.container}>
      <AppBarTab
        label="Repositories"
        onPress={() => navigate("/")}
      />
      <AppBarTab
        label="Sign in"
        onPress={() => navigate("/signin")}
      />
    </View>
  )
}

export default AppBar
