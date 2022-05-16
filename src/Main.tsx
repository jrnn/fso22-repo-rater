import { StyleSheet, View } from "react-native"
import { Navigate, Route, Routes } from "react-router-native"
import AppBar from "./components/AppBar"
import CreateReview from "./components/CreateReview"
import MyReviews from "./components/MyReviews"
import Notification from "./components/Notification"
import RepositoryDetails from "./components/RepositoryDetails"
import RepositoryList from "./components/RepositoryList"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1
  }
})

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Notification />
    <Routes>
      <Route path="/repositories/:id" element={<RepositoryDetails />} />
      <Route path="/createReview" element={<CreateReview />} />
      <Route path="/myReviews" element={<MyReviews />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<RepositoryList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
)

export default Main
