import { StyleSheet, View } from "react-native"
import { Navigate, Route, Routes } from "react-router-native"
import AppBar from "./AppBar"
import Notification from "./Notification"
import RepositoryDetails from "./RepositoryDetails"
import RepositoryList from "./RepositoryList"
import SignIn from "./SignIn"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  }
})

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Notification />
    <Routes>
      <Route path="/repositories/:id" element={<RepositoryDetails />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<RepositoryList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
)

export default Main
