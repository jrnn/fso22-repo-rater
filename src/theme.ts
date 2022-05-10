type FontWeight = "300" | "400" | "700"

export const theme = {
  palette: {
    dark: "#13171d",
    light: "#f4f6f9",
    primary: "#53657f",
    _maybeLater: "#25354d"
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
