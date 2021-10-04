import { StyleProp, ViewStyle } from "react-native"

export interface FooterProps {
  /**
   * footer text non-i18n
   */
  title?: string

  /**
   * What happens when you press the button
   */
  onPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>
}
