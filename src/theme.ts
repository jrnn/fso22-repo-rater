type FontWeight = "300" | "400" | "700"

export const theme = {
  palette: {
    dark: "#13171d",
    light: "#f7f9fb",
    primary: "#25354d"
  },
  spacing: {
    dense: 6,
    regular: 12,
    wide: 24
  },
  typography: {
    fontSize: {
      body: 14,
      subheading: 16
    },
    fontWeight: {
      light: "300" as FontWeight,
      medium: "400" as FontWeight,
      bold: "700" as FontWeight
    }
  }
}
