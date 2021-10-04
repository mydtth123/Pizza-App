import React, { FC } from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle, TouchableOpacity } from "react-native"
import { BlurView } from "expo-blur"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const receiptIcon = require("../../../assets/images/icons/receipt.png")
const arrowRight = require("../../../assets/images/icons/arrow-right-green.png")
const clarityCoin = require("./clarity-coin.png")
const confirmIcon = require("./confirmed.png")
const preparingIcon = require("./preparing.png")
const dispatchedIcon = require("./dispatched.png")
const inTransitIcon = require("./in-transit.png")
const deliveredIcon = require("./delivered.png")

const stepData = [
  {
    id: 1,
    time: "11:41am",
    label: "Order Confirmed",
    icon: confirmIcon,
  },
  {
    id: 2,
    time: "12:01pm",
    label: "Preparing....",
    icon: preparingIcon,
  },
  {
    id: 3,
    time: "",
    label: "Dispatched",
    icon: dispatchedIcon,
  },
  {
    id: 4,
    time: "",
    label: "In Transit",
    icon: inTransitIcon,
  },
  {
    id: 5,
    time: "",
    label: "Delivered",
    icon: deliveredIcon,
  },
]

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.backgroundLightGrey,
}
const SUB_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4] + 4,
}
const PIZZA_ICON: ImageStyle = {
  width: 30,
  height: 30,
  marginTop: 30,
  marginBottom: spacing[1] + 1,
}
const CHECK_PIZZA_TITLE: TextStyle = {
  fontSize: spacing[5] + 1,
  fontFamily: typography.light,
  color: color.palette.white,
  marginBottom: spacing[2] + 2,
}
const ORDER_DETAIL_CONTAINER: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  marginTop: spacing[5],
  borderRadius: 20,
  overflow: "hidden",
}
const ORDER_HEADER: ViewStyle = {
  padding: spacing[5] + 1,
  borderBottomWidth: 0.5,
  borderColor: color.palette.stroke,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const TEXT_SMALL_BOLD: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
}
const TEXT_CENTER: TextStyle = {
  textAlign: "center",
}
const TEXT_RED_BOLD: TextStyle = {
  fontSize: spacing[4] + 4,
  fontFamily: typography.bold,
  color: color.palette.red,
  textAlign: "center",
}
const ORDER_BODY: ViewStyle = {
  paddingVertical: spacing[7] + 2,
  paddingLeft: spacing[6] + 6,
}
const ORDER_BODY_ROW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing[6],
}
const CONFIRM_ICON: ImageStyle = {
  width: 30,
  height: 30,
}
const EARN_CASHBACK: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: color.palette.green,
  borderRadius: 20,
  marginTop: 10,
  overflow: "hidden",
}
const EARN_CASHBACK_LEFT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  backgroundColor: "rgba(222, 243, 225, 0.5)",
  paddingVertical: spacing[4] + 4,
  paddingLeft: spacing[5] + 1,
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  overflow: "hidden",
  borderRightWidth: 1,
  borderColor: color.palette.green,
}
const CASH_ICON_WRAPPER: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: color.palette.green,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 22,
}
const CASH_ICON: ImageStyle = {
  width: 24,
  height: 24,
}
const EARN_CASHBACK_TITLE: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.bold,
  color: color.palette.green,
}
const EARN_CASHBACK_PRICE: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
}
const RIGHT_ICON_WRAPPER: ViewStyle = {
  paddingHorizontal: 23,
  paddingVertical: 30,
  backgroundColor: "rgba(87, 193, 104, 0.2)",
}
const ARROW_RIGHT_ICON: ImageStyle = {
  width: 10,
  height: 20,
}
const STEP_RIGHT: ViewStyle = {
  marginLeft: 46,
}
const STEP_TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
}
const STEP_TEXT_MEDIUM: TextStyle = {
  ...STEP_TEXT,
  fontFamily: typography.bold,
}
const STEP_LINE: ViewStyle = {
  width: 1,
  height: 40,
  backgroundColor: color.palette.stroke,
  position: "absolute",
  top: 25,
  left: 15,
}
const STEP_LINE_PRIMARY: ViewStyle = {
  ...STEP_LINE,
  backgroundColor: color.palette.red,
}
const MARGIN_BOTTOM_0: ViewStyle = {
  marginBottom: 0,
}

export const OrderDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "order-details">
> = observer(({ route, navigation }) => {
  const { price: totalPrice } = route.params || {}

  const currentMonth = moment().format("MMM")
  const currentDay = moment().format("D")
  const invoiceNumber = Math.floor(10000 + Math.random() * 9000)

  return (
    <View testID="OrderDetailScreen" style={FULL}>
      <Screen
        style={CONTAINER}
        preset="scroll"
        backgroundColor={color.background}
        header={
          <Header
            headerText="Uncle John Pizzas"
            leftIcon="back"
            rightIcon="home"
            navigation={navigation}
          />
        }
      >
        <GradientBackground height={200} />
        <View style={SUB_CONTAINER}>
          <Image source={receiptIcon} resizeMode="contain" style={PIZZA_ICON} />
          <Text style={CHECK_PIZZA_TITLE}>Order Details</Text>

          <View style={ORDER_DETAIL_CONTAINER}>
            <BlurView intensity={100}>
              <View style={ORDER_HEADER}>
                <View>
                  <Text style={[TEXT_SMALL_BOLD, TEXT_CENTER]}>Ordered on</Text>
                  <Text style={TEXT_RED_BOLD}>
                    {currentDay} {currentMonth}
                  </Text>
                </View>
                <View>
                  <Text style={[TEXT_SMALL_BOLD, TEXT_CENTER]}>Invoice #</Text>
                  <Text style={TEXT_RED_BOLD}>#{invoiceNumber}</Text>
                </View>
                <View>
                  <Text style={[TEXT_SMALL_BOLD, TEXT_CENTER]}>total due</Text>
                  <Text style={TEXT_RED_BOLD}>${totalPrice.toFixed(2)}</Text>
                </View>
              </View>

              <View style={ORDER_BODY}>
                {stepData.map((item, index) => (
                  <View
                    style={[ORDER_BODY_ROW, index === stepData.length - 1 ? MARGIN_BOTTOM_0 : null]}
                    key={item.id}
                  >
                    {index !== stepData.length - 1 ? (
                      <View style={index === 0 ? STEP_LINE_PRIMARY : STEP_LINE} />
                    ) : null}
                    <Image source={item.icon} resizeMode="contain" style={CONFIRM_ICON} />
                    <View style={STEP_RIGHT}>
                      {item.time ? <Text style={TEXT_SMALL_BOLD}>{item.time}</Text> : null}
                      <Text style={item.time ? STEP_TEXT_MEDIUM : STEP_TEXT}>{item.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>

          <View style={EARN_CASHBACK}>
            <View style={EARN_CASHBACK_LEFT}>
              <View style={CASH_ICON_WRAPPER}>
                <Image source={clarityCoin} resizeMode="contain" style={CASH_ICON} />
              </View>
              <View>
                <Text style={EARN_CASHBACK_TITLE}>Earned cashback!</Text>
                <Text style={EARN_CASHBACK_PRICE}>+ $1.45</Text>
              </View>
            </View>
            <TouchableOpacity style={RIGHT_ICON_WRAPPER}>
              <Image source={arrowRight} resizeMode="contain" style={ARROW_RIGHT_ICON} />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </View>
  )
})
