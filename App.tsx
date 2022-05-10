import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Constants from "expo-constants"
import RepositoryList from "./src/components/RepositoryList"

export default function App() {
  return (
    <View style={styles.container}>
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
