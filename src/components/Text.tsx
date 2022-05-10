import { FC } from "react"
import { StyleProp, StyleSheet, Text as NativeText, TextProps, TextStyle } from "react-native"
import { theme } from "../theme"

type Color = "dark" | "light"
type Variant = "body" | "caption" | "subheading"
type Weight = "light" | "medium" | "bold"

interface Props extends TextProps {
  color?: Color
  style?: StyleProp<TextStyle>
  variant?: Variant
  weight?: Weight
}

const styles = StyleSheet.create({
  regular: {
    color: theme.palette.dark,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium
  },
  colorLight: {
    color: theme.palette.light
  },
  variantCaption: {
    fontSize: theme.typography.fontSize.caption
  },
  variantSubheading: {
    fontSize: theme.typography.fontSize.subheading
  },
  weightLight: {
    fontWeight: theme.typography.fontWeight.light
  },
  weightBold: {
    fontWeight: theme.typography.fontWeight.bold
  }
})

const Text: FC<Props> = ({
  color = "dark",
  variant = "body",
  weight = "medium",
  style,
  ...props
}) => (
  <NativeText
    { ...props }
    style={[
      styles.regular,
      color === "light" && styles.colorLight,
      variant === "caption" && styles.variantCaption,
      variant === "subheading" && styles.variantSubheading,
      weight === "light" && styles.weightLight,
      weight === "bold" && styles.weightBold,
      style
    ]}
  />
)

export default Text
