import { ScrollView, StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native"
import Constants from "expo-constants"
import AppBarTab from "./AppBarTab"
import { useSignOut, useWhoAmI } from "../hooks"
import { theme } from "../theme"

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
  const me = useWhoAmI()
  const { signOut } = useSignOut()

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          label="Repositories"
          onPress={() => navigate("/")}
        />
        {me &&
          <AppBarTab
            label="Create a review"
            onPress={() => navigate("/createReview")}
          />
        }
        {!me ?
          <AppBarTab
            label="Sign in"
            onPress={() => navigate("/signin")}
          /> :
          <AppBarTab
            label="Sign out"
            onPress={signOut}
          />
        }
        {!me &&
          <AppBarTab
            label="Sign up"
            onPress={() => navigate("/signup")}
          />
        }
      </ScrollView>
    </View>
  )
}

export default AppBar
