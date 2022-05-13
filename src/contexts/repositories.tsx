/**
 * This is a bit bloated, but I couldn't get these working simply with local state WITHOUT hoisting
 * the state to Main and prop drilling it back down. I think this is preferrable, because Main
 * shouldn't need to know anything about filtering and sorting.
 */

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react"

export type SortingPreference = "latest" | "highestRated" | "lowestRated"
type SetSortingPreference = Dispatch<SetStateAction<SortingPreference>>
type SetSearchKeyword = Dispatch<SetStateAction<string>>

const SortingPreferenceContext = createContext<SortingPreference | undefined>(undefined)
const SetSortingPreferenceContext = createContext<SetSortingPreference | undefined>(undefined)
const SearchKeywordContext = createContext<string | undefined>(undefined)
const SetSearchKeywordContext = createContext<SetSearchKeyword | undefined>(undefined)

export const SortingPreferenceProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [ preference, setPreference ] = useState<SortingPreference>("latest")
  return (
    <SetSortingPreferenceContext.Provider value={setPreference}>
      <SortingPreferenceContext.Provider value={preference}>
        {children}
      </SortingPreferenceContext.Provider>
    </SetSortingPreferenceContext.Provider>
  )
}

export const SearchKeywordProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [ keyword, setKeyword ] = useState<string>("")
  return (
    <SetSearchKeywordContext.Provider value={setKeyword}>
      <SearchKeywordContext.Provider value={keyword}>
        {children}
      </SearchKeywordContext.Provider>
    </SetSearchKeywordContext.Provider>
  )
}

export const useSortingPreference = (): SortingPreference => {
  const preference = useContext(SortingPreferenceContext)
  if (preference === undefined) {
    throw new Error("'useSortingPreference' may only be used from within SortingPreferenceProvider")
  }
  return preference
}

export const useSortingPreferenceSetter = (): SetSortingPreference => {
  const setPreference = useContext(SetSortingPreferenceContext)
  if (setPreference === undefined) {
    throw new Error("'useSortingPreferenceSetter' may only be used from within SortingPreferenceProvider")
  }
  return setPreference
}

export const useSearchKeyword = (): string => {
  const keyword = useContext(SearchKeywordContext)
  if (keyword === undefined) {
    throw new Error("'useSearchKeyword' may only be used from within SearchKeywordProvider")
  }
  return keyword
}

export const useSearchKeywordSetter = (): SetSearchKeyword => {
  const setKeyword = useContext(SetSearchKeywordContext)
  if (setKeyword === undefined) {
    throw new Error("'useSearchKeywordSetter' may only be used from within SearchKeywordProvider")
  }
  return setKeyword
}
