import { Picker } from "@react-native-picker/picker"
import { useSortingPreference, useSortingPreferenceSetter } from "../../contexts"

const RepositorySorter = () => {
  const selected = useSortingPreference()
  const setSelected = useSortingPreferenceSetter()
  return (
    <Picker
      selectedValue={selected}
      onValueChange={setSelected}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  )
}

export default RepositorySorter
