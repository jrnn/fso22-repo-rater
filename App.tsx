import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>I'm looking at this text on the screen of my OnePlus. What a time to be alive!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
