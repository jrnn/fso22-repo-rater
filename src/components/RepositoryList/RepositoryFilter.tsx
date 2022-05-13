import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import TextInput from "../TextInput"
import { useSearchKeyword, useSearchKeywordSetter } from "../../contexts"

const RepositoryFilter = () => {
  const searchKeyword = useSearchKeyword()
  const setSearchKeyword = useSearchKeywordSetter()
  const [ value, setValue ] = useState<string>(searchKeyword)
  const [ debouncedValue ] = useDebounce(value, 1000)

  useEffect(() => {
    const keyword = debouncedValue.trim().toLowerCase()
    setSearchKeyword(keyword)
  }, [ debouncedValue, setSearchKeyword ])

  return (
    <TextInput
      onChangeText={setValue}
      placeholder="Search by name"
      value={value}
    />
  )
}

export default RepositoryFilter
