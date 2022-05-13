/**
 * This is probably unnecessary, but I didn't want the sorting selection to
 * disappear on page changes, without hoisting local state and prop drilling.
 */

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react"

export type SortingPreference = "latest" | "highestRated" | "lowestRated"
type SetSortingPreference = Dispatch<SetStateAction<SortingPreference>>

const SortingPreferenceContext = createContext<SortingPreference | undefined>(undefined)
const SetSortingPreferenceContext = createContext<SetSortingPreference | undefined>(undefined)

export const SortingPreferenceProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [ sortingPreference, setSortingPreference ] = useState<SortingPreference>("latest")
  return (
    <SetSortingPreferenceContext.Provider value={setSortingPreference}>
      <SortingPreferenceContext.Provider value={sortingPreference}>
        {children}
      </SortingPreferenceContext.Provider>
    </SetSortingPreferenceContext.Provider>
  )
}

export const useSortingPreference = (): SortingPreference => {
  const sortingPreference = useContext(SortingPreferenceContext)
  if (!sortingPreference) {
    throw new Error("'useSortingPreference' may only be used from within SortingPreferenceProvider")
  }
  return sortingPreference
}

export const useSortingPreferenceSetter = (): SetSortingPreference => {
  const setSortingPreference = useContext(SetSortingPreferenceContext)
  if (!setSortingPreference) {
    throw new Error("'useSortingPreferenceSetter' may only be used from within SortingPreferenceProvider")
  }
  return setSortingPreference
}
