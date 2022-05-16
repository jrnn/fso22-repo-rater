import { Platform } from "react-native"

type FontWeight = "300" | "400" | "700"

export const theme = {
  palette: {
    dark: "#13171d",
    light: "#f4f6f9",
    primary: "#53657f",
    primaryLight: "#7f97bf",
    error: "#c12f3e",
    success: "#537f59",
    grey: "#7f838b",
    greyLight: "#adb3bf"
  },
  rounding: {
    regular: 6
  },
  spacing: {
    dense: 6,
    regular: 12,
    wide: 24
  },
  typography: {
    font: {
      main: Platform.select({
        android: "Roboto",
        ios: "Arial",
        default: "System"
      })
    },
    fontSize: {
      body: 15,
      caption: 13,
      subheading: 17
    },
    fontWeight: {
      light: "300" as FontWeight,
      medium: "400" as FontWeight,
      bold: "700" as FontWeight
    }
  }
}
