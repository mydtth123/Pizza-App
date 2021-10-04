import * as React from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { BlurView } from "expo-blur"
import { Text } from "../text/text"
import { color, spacing, typography } from "../../theme"
import { DeliverPopupProps, DeliverData } from "./deliverPopup.props"

const data: Array<DeliverData> = [
  {
    id: 1,
    title: "Current Location",
    text: "",
    icon: require("../../../assets/images/icons/location.png"),
  },
  {
    id: 2,
    title: "Home",
    text: "3728  Brand Road, Swift Current",
    icon: require("../../../assets/images/icons/home-red.png"),
  },
  {
    id: 3,
    title: "Other",
    text: "81 Springside, Lancaster",
    icon: require("../../../assets/images/icons/pin.png"),
  },
  {
    id: 4,
    title: "Work",
    text: "4932 Sixth Street, Westminster",
    icon: require("../../../assets/images/icons/bag.png"),
  },
  {
    id: 5,
    title: "Add a new address",
    text: "",
    icon: require("../../../assets/images/icons/plus.png"),
  },
]

const CONTAINER: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingBottom: 25,
  borderBottomLeftRadius: spacing[4] + 4,
  borderBottomRightRadius: spacing[4] + 4,
}
const WRAPPER: ViewStyle = {
  flexDirection: "row",
  paddingLeft: 70,
  paddingRight: 20,
  alignItems: "center",
  borderBottomWidth: 0.25,
  borderColor: color.palette.stroke,
}
const ICON: ImageStyle = {
  width: 24,
  height: 24,
}
const WRAPPER_TEXT: ViewStyle = {
  marginLeft: spacing[4] + 4,
}
const TITLE: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.bold,
}
const TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
}
const HEIGHT_SMALL: ViewStyle = {
  height: 51,
}
const HEIGHT_BIG: ViewStyle = {
  height: 76,
}

export function DeliverPopup(props: DeliverPopupProps) {
  const { isVisible, onItemPress } = props || {}

  return isVisible ? (
    <BlurView style={CONTAINER} intensity={100}>
      <View style={ROOT}>
        {data.map((item) => (
          <TouchableOpacity
            style={[WRAPPER, !item.text ? HEIGHT_SMALL : HEIGHT_BIG]}
            key={item.id}
            onPress={() => onItemPress(item)}
          >
            <Image source={item.icon} resizeMode="contain" style={ICON} />
            <View style={WRAPPER_TEXT}>
              <Text style={TITLE}>{item.title}</Text>
              {item.text ? <Text style={TEXT}>{item.text}</Text> : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  ) : null
}
