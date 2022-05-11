/**
 * The AuthStorage implementation is hidden from sight and can be accessed only
 * via React context, which is exposed to the application with a custom hook.
 * Since the storage instance is stable, AuthStorageProvider should be rendered
 * only once, i.e. there should be no performance drawback.
 */

import { createContext, FC, PropsWithChildren, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY = "FSO22_REPO_RATER:AUTH"

export interface AuthStorage {
  getAccessToken: () => Promise<string | null>
  setAccessToken: (token: string) => Promise<void>
  removeAccessToken: () => Promise<void>
}

const storage: AuthStorage = {
  getAccessToken: async () => {
    return await AsyncStorage.getItem(KEY)
  },
  setAccessToken: async (token) => {
    await AsyncStorage.setItem(KEY, token)
  },
  removeAccessToken: async () => {
    await AsyncStorage.removeItem(KEY)
  }
}

const AuthStorageContext = createContext<AuthStorage | undefined>(undefined)

export const AuthStorageProvider: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <AuthStorageContext.Provider value={storage}>
    {children}
  </AuthStorageContext.Provider>
)

export const useAuthStorage = (): AuthStorage => {
  const authStorage = useContext(AuthStorageContext)
  if (!authStorage) {
    throw new Error("'useAuthStorage()' may only be used from within AuthStorageProvider")
  }
  return authStorage
}
