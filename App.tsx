import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { NativeRouter, Navigate, Route, Routes } from "react-router-native"
import AppBar from "./src/components/AppBar"
import RepositoryList from "./src/components/RepositoryList"
import SignIn from "./src/components/SignIn"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  }
})

const App = () => {
  return (
    <>
      <NativeRouter>
        <View style={styles.container}>
          <AppBar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<RepositoryList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </View>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}

export default App
