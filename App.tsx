import { NativeRouter } from "react-router-native"
import { StatusBar } from "expo-status-bar"
import { AuthStorageProvider, NotificationProvider, SearchKeywordProvider, SortingPreferenceProvider } from "./src/contexts"
import { GraphQLProvider } from "./src/graphql"
import Main from "./src/Main"

const App = () => (
  <>
    <NativeRouter>
      <AuthStorageProvider>
        <GraphQLProvider>
          <NotificationProvider>
            <SortingPreferenceProvider>
              <SearchKeywordProvider>
                <Main />
              </SearchKeywordProvider>
            </SortingPreferenceProvider>
          </NotificationProvider>
        </GraphQLProvider>
      </AuthStorageProvider>
    </NativeRouter>
    <StatusBar style="auto" />
  </>
)

export default App
