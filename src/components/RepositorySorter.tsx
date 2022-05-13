import { StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Container from "./Container"
import { useSortingPreference, useSortingPreferenceSetter } from "../contexts"
import { theme } from "../theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.greyLight
  }
})

const RepositorySorter = () => {
  const selected = useSortingPreference()
  const setSelected = useSortingPreferenceSetter()
  return (
    <Container style={styles.container}>
      <Picker
        selectedValue={selected}
        onValueChange={setSelected}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
    </Container>
  )
}

export default RepositorySorter
