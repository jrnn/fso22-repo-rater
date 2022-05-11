import Constants from "expo-constants"

const envVars = Constants.manifest?.extra || {}
const apolloUri = envVars["apolloUri"]

if (!apolloUri) {
  console.error("Missing env var 'APOLLO_URI'. Check your .env file.")
  process.exit(1)
}

export const APOLLO_URI = String(apolloUri)
