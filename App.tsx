import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import AppBar from "./src/components/AppBar"
import RepositoryList from "./src/components/RepositoryList"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  }
})

const App = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  )
}

export default App
