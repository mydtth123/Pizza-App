import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, ImageStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n/"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[2],
  alignItems: "center",
  justifyContent: "flex-start",
  height: 48,
  borderTopWidth: 0.25,
  borderBottomWidth: 0.25,
  borderColor: color.palette.stroke,
}
const TITLE: TextStyle = { textAlign: "center", fontSize: 15, fontFamily: typography.light }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }
const LEFT_ICON: ViewStyle = {
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
}
const ICON: ImageStyle = { width: 24, height: 24 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    navigation,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  const leftPress = () => {
    if (onLeftPress) onLeftPress()
    else navigation.goBack()
  }

  const rightPress = () => {
    if (onRightPress) onRightPress()
    else navigation.navigate("home")
  }

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <TouchableOpacity onPress={leftPress} style={LEFT_ICON}>
          <Icon icon={leftIcon} style={ICON} />
        </TouchableOpacity>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={rightPress} style={LEFT_ICON}>
          <Icon icon={rightIcon} style={ICON} />
        </TouchableOpacity>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
