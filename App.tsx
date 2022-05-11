import { NativeRouter } from "react-router-native"
import { StatusBar } from "expo-status-bar"
import { AuthStorageProvider, NotificationProvider } from "./src/contexts"
import { GraphQLProvider } from "./src/graphql"
import Main from "./src/components/Main"

const App = () => (
  <>
    <NativeRouter>
      <AuthStorageProvider>
        <GraphQLProvider>
          <NotificationProvider>
            <Main />
          </NotificationProvider>
        </GraphQLProvider>
      </AuthStorageProvider>
    </NativeRouter>
    <StatusBar style="auto" />
  </>
)

export default App
