import * as React from "react"
import { ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { palette } from "../../theme/palette"

const BG_GRADIENT: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

export interface GradientBackgroundProps {
  colors?: string[]
  height?: number | string
}

export function GradientBackground(props: GradientBackgroundProps) {
  const { height = 152 } = props || {}
  return (
    <LinearGradient
      colors={[palette.red, palette.orange]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
      style={[BG_GRADIENT, { height }]}
    />
  )
}
