import React, { useMemo } from "react"
import {
  View,
  ViewStyle,
  ImageStyle,
  Dimensions,
  Image,
  LayoutAnimation,
  Text,
  TextStyle,
} from "react-native"
import { BlurView } from "expo-blur"
import { PizzaItemProps } from "./pizza-item.props"
import { color, spacing, typography } from "../../theme"

const pizzaThin = require("./pizza.png")
const pizzaThick = require("./pizza-thick.png")

const toppingsObj = {
  1: { image: require("./pepperoni-extra.png") },
  2: { image: require("./mushrooms-extra.png") },
  3: { image: require("./black-olives-extra.png") },
  4: { image: require("./sausages-extra.png") },
  5: { image: require("./bacon-extra.png") },
  6: { image: require("./cheese-extra.png") },
  7: { image: require("./green-papers-extra.png") },
  8: { image: require("./pineapples-extra.png") },
  9: { image: require("./spinach-extra.png") },
  10: { image: require("./onions-extra.png") },
}

const SCREEN_WIDTH = Dimensions.get("screen").width
const ROUNDED_WIDTH = SCREEN_WIDTH + 25

// static styles
const PIZZA_WRAPPER: ViewStyle = {
  borderRadius: SCREEN_WIDTH / 2,
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  alignItems: "center",
  justifyContent: "center",
}
const PIZZA_VIEW: ViewStyle = {
  padding: 25,
  borderRadius: SCREEN_WIDTH / 2,
  backgroundColor: color.palette.white,
  overflow: "hidden",
}
const PIZZA_SIZE_CONTAINER: ViewStyle = {
  paddingHorizontal: 15,
  alignItems: "center",
  marginTop: 30,
}
const PIZZA_IMG: ImageStyle = {
  flex: 1,
  width: null,
  height: null,
}
const PIZZA_TOPPING: ImageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
}
const ROUNDED: ViewStyle = {
  width: ROUNDED_WIDTH,
  height: (ROUNDED_WIDTH + 25) / 2,
  position: "absolute",
  overflow: "hidden",
  bottom: -50,
  alignItems: "center",
}
const ROUNDED_HALF: ViewStyle = {
  width: ROUNDED_WIDTH,
  height: ROUNDED_WIDTH,
  borderRadius: ROUNDED_WIDTH / 2,
  borderWidth: 0.5,
  borderColor: color.palette.stroke,
  position: "absolute",
  bottom: 20,
}
const ROUNDED_TEXT: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  paddingHorizontal: 15,
  paddingVertical: 5,
  backgroundColor: color.palette.stroke,
  borderRadius: 10,
  overflow: "hidden",
  position: "absolute",
  bottom: 10,
}

export function PizzaItem(props: PizzaItemProps) {
  const { size, crust, toppingSelected, showSizeText, showCrustText } = props

  const imgStyle = useMemo(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    switch (size) {
      case "small":
        return [
          {
            width: SCREEN_WIDTH - 70,
            height: SCREEN_WIDTH - 70,
          },
          {
            width: SCREEN_WIDTH - 120,
            height: SCREEN_WIDTH - 120,
          },
        ]
      case "large":
        return [
          {
            width: SCREEN_WIDTH - 30,
            height: SCREEN_WIDTH - 30,
          },
          {
            width: SCREEN_WIDTH - 80,
            height: SCREEN_WIDTH - 80,
          },
        ]
      default:
        return [
          {
            width: SCREEN_WIDTH - 50,
            height: SCREEN_WIDTH - 50,
          },
          {
            width: SCREEN_WIDTH - 100,
            height: SCREEN_WIDTH - 100,
          },
        ]
    }
  }, [size])

  const renderImage = useMemo(() => {
    if (crust === "thick") return pizzaThick
    else return pizzaThin
  }, [crust])

  const showText = useMemo(() => {
    if (showSizeText) {
      switch (size) {
        case "small":
          return "10”"
        case "large":
          return "14”"
        default:
          return "12”"
      }
    }

    if (showCrustText) {
      switch (crust) {
        case "thin":
          return "+$2.00"
        default:
          return "+$4.00"
      }
    }

    return ""
  }, [size, crust, showSizeText, showCrustText])

  return (
    <View style={PIZZA_SIZE_CONTAINER}>
      <View style={[PIZZA_WRAPPER, imgStyle[0]]}>
        <BlurView intensity={100} style={[PIZZA_WRAPPER, imgStyle[0]]}>
          <View style={[PIZZA_VIEW, imgStyle[1]]}>
            <Image source={renderImage} style={PIZZA_IMG} resizeMode="contain" />
            {toppingSelected && toppingSelected.length > 0
              ? toppingSelected.map((item) => (
                  <Image
                    key={item}
                    source={toppingsObj[item].image}
                    style={[PIZZA_IMG, PIZZA_TOPPING]}
                    resizeMode="contain"
                  />
                ))
              : null}
          </View>
        </BlurView>
      </View>
      {showCrustText || showSizeText ? (
        <View style={ROUNDED}>
          <View style={ROUNDED_HALF} />
          <Text style={ROUNDED_TEXT}>{showText}</Text>
        </View>
      ) : null}
    </View>
  )
}
