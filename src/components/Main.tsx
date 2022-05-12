import { StyleSheet, View } from "react-native"
import { Navigate, Route, Routes } from "react-router-native"
import AppBar from "./AppBar"
import CreateReview from "./CreateReview"
import Notification from "./Notification"
import RepositoryDetails from "./RepositoryDetails"
import RepositoryList from "./RepositoryList"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

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
      <Route path="/createReview" element={<CreateReview />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<RepositoryList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
)

export default Main
