import React from "react"
import { ViewStyle, TextStyle } from "react-native"
import { FooterProps } from "./footer.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { color, spacing, typography } from "../../theme"

// static styles
const ROOT: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: 59,
}
const TEXT: TextStyle = {
  fontSize: spacing[3] + 3,
  fontFamily: typography.bold,
  color: color.palette.white,
}

export function Footer(props: FooterProps) {
  const { onPress, title } = props

  return (
    <Button onPress={onPress} style={ROOT}>
      <Text style={TEXT}>{title}</Text>
    </Button>
  )
}
