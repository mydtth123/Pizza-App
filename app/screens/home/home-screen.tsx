import React, { FC, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { BlurView } from "expo-blur"
import { Button, Screen, Text, GradientBackground, AutoImage } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { DeliverPopup } from "../../components/deliverPopup/deliverPopup"

const menu = require("../../../assets/images/icons/menu.png")
const cartGrey = require("../../../assets/images/icons/cart.png")
const thinPizza = require("./thin-pizza.png")
const bigPizza = require("./big-pizza.png")

const SCREEN_WIDTH = Dimensions.get("screen").width

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.backgroundLightGrey,
}
const SUB_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4] + 4,
  flex: 1,
  paddingBottom: spacing[5],
}
const HEADER_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderTopWidth: 0.25,
  borderBottomWidth: 0.25,
  borderColor: color.palette.stroke,
  height: spacing[7],
}
const HEADER_ICON: ImageStyle = {
  width: 24,
  height: 24,
}
const MENU_ICON: ImageStyle = {
  ...HEADER_ICON,
  height: 20,
}
const MENU_BUTTON: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
}
const CART_BUTTON: ViewStyle = {
  ...MENU_BUTTON,
  marginLeft: "auto",
}
const DELIVER_MENU: ViewStyle = {
  marginLeft: spacing[3] - 2,
}
const DELIVER_TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
}
const DELIVER_HOME_TEXT: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
}
const WELCOME_TEXT_WRAPPER: ViewStyle = {
  marginTop: spacing[4],
}
const HELLO_NAME_TEXT: TextStyle = {
  fontSize: spacing[4] - 2,
  color: color.palette.white,
  marginBottom: spacing[2],
}
const WHAT_PIZZA_WRAPPER: ViewStyle = {
  borderLeftWidth: 1,
  borderColor: color.palette.white,
  paddingLeft: spacing[3],
}
const WHAT_PIZZA: TextStyle = {
  fontSize: spacing[5] + 1,
  color: color.palette.white,
  fontFamily: typography.light,
  lineHeight: spacing[6] - 3,
}
const PIZZA_BOLD: TextStyle = {
  ...WHAT_PIZZA,
  fontFamily: typography.bold,
}
const REORDER_CONTAINER: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 255, 0.4)",
}
const REORDER_WRAPPER: ViewStyle = {
  paddingTop: spacing[3] + 2,
  paddingRight: spacing[5] - 2,
  paddingBottom: spacing[5] + 3,
  marginTop: spacing[4] + 2,
  borderRadius: spacing[4] + 4,
  overflow: "hidden",
  height: 220,
  justifyContent: "center",
  alignItems: "flex-end",
}
const THIN_PIZZA_IMG: ImageStyle = {
  width: SCREEN_WIDTH / 1.4,
  height: SCREEN_WIDTH / 1.4,
  position: "absolute",
  top: -15,
  left: -90,
}
const REORDER_AGAIN: TextStyle = {
  fontSize: spacing[4] + 4,
  fontFamily: typography.bold,
  color: color.palette.red,
}
const REORDER_PROPERTIES: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
  marginTop: 3,
  marginBottom: spacing[2],
}
const REORDER_PRICE: TextStyle = {
  fontSize: spacing[4] + 4,
  fontFamily: typography.bold,
}
const REORDER_WRAPPER_TEXT: ViewStyle = {
  width: "50%",
}
const REORDER_BUTTON: ViewStyle = {
  marginTop: spacing[3],
  height: 38,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: spacing[4] + 4,
  width: 123,
  alignSelf: "flex-start",
  overflow: "hidden",
}
const REORDER_BUTTON_TEXT: TextStyle = {
  fontSize: spacing[3] + 3,
  fontFamily: typography.bold,
  color: color.palette.white,
}
const CREATE_YOUR_PIZZA_WRAPPER: ViewStyle = {
  borderRadius: spacing[4] + 4,
  paddingTop: spacing[6] - 2,
  backgroundColor: color.palette.white,
  marginTop: spacing[4] + 2,
  height: SCREEN_WIDTH,
}
const CREATE_YOUR_PIZZA_TEXT: TextStyle = {
  fontSize: spacing[5] + 1,
  fontFamily: typography.light,
  color: color.palette.red,
  textAlign: "center",
}
const CREATE_YOUR_PIZZA_DESC: TextStyle = {
  fontSize: spacing[3] - 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
  marginTop: spacing[2] - 2,
  textAlign: "center",
}
const CREATE_YOUR_PIZZA_FONT_BOLD: TextStyle = {
  ...CREATE_YOUR_PIZZA_TEXT,
  fontFamily: typography.bold,
}
const PIZZA_BIG_IMG: ImageStyle = {
  width: SCREEN_WIDTH - 40,
  height: SCREEN_WIDTH - 40,
  position: "absolute",
  bottom: -40,
  left: 0,
  right: 0,
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [isDeliverVisible, setDeliverVisible] = useState<boolean>(false)
    const [deliverTo, setDeliverTo] = useState<string>("Home")

    const toggleDrawer = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.toggleDrawer()
    }

    const toggleDeliverVisible = () => {
      setDeliverVisible(!isDeliverVisible)
    }

    const onDeliverItemPress = (item) => {
      toggleDeliverVisible()
      if (item.id === 5) return

      setDeliverTo(item.title)
    }

    const onCreatePizza = () => {
      navigation.navigate("choose-size")
    }

    return (
      <View testID="HomeScreen" style={FULL}>
        <Screen
          style={CONTAINER}
          preset="scroll"
          backgroundColor={color.background}
          header={
            <View style={HEADER_WRAPPER}>
              <TouchableOpacity style={MENU_BUTTON} onPress={toggleDrawer}>
                <Image source={menu} style={MENU_ICON} />
              </TouchableOpacity>
              <TouchableOpacity style={DELIVER_MENU} onPress={toggleDeliverVisible}>
                <Text style={DELIVER_TEXT}>Deliver to:</Text>
                <Text style={DELIVER_HOME_TEXT}>{deliverTo}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={CART_BUTTON}>
                <Image source={cartGrey} style={HEADER_ICON} />
              </TouchableOpacity>
            </View>
          }
        >
          <GradientBackground />
          <DeliverPopup isVisible={isDeliverVisible} onItemPress={onDeliverItemPress} />
          <View style={SUB_CONTAINER}>
            <View style={WELCOME_TEXT_WRAPPER}>
              <Text style={HELLO_NAME_TEXT}>Hi Jaykey!</Text>
              <View style={WHAT_PIZZA_WRAPPER}>
                <Text style={WHAT_PIZZA}>
                  What <Text style={PIZZA_BOLD}>pizza</Text> do you{"\n"}want to try today?
                </Text>
              </View>
            </View>
            <View style={REORDER_CONTAINER}>
              <BlurView intensity={100} style={REORDER_WRAPPER}>
                <AutoImage source={thinPizza} style={THIN_PIZZA_IMG} />
                <View style={REORDER_WRAPPER_TEXT}>
                  <Text style={REORDER_AGAIN}>Reorder again?</Text>
                  <Text style={REORDER_PROPERTIES}>
                    Small, thin crust,{"\n"}tomatoes, basil, cheese
                  </Text>
                  <Text style={REORDER_PRICE}>$12</Text>
                  <Button style={REORDER_BUTTON}>
                    <Text style={REORDER_BUTTON_TEXT}>Add to cart</Text>
                  </Button>
                </View>
              </BlurView>
            </View>

            <TouchableOpacity style={CREATE_YOUR_PIZZA_WRAPPER} onPress={onCreatePizza}>
              <Text style={CREATE_YOUR_PIZZA_TEXT}>
                Create your <Text style={CREATE_YOUR_PIZZA_FONT_BOLD}>own pizza</Text>
              </Text>
              <Text style={CREATE_YOUR_PIZZA_DESC}>The cost will depend on your customization</Text>
              <AutoImage source={bigPizza} style={PIZZA_BIG_IMG} />
            </TouchableOpacity>
          </View>
        </Screen>
      </View>
    )
  },
)
