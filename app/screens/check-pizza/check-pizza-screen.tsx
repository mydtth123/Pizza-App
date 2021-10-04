import React, { FC, useMemo } from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle, Dimensions } from "react-native"
import { BlurView } from "expo-blur"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Footer } from "../../components/footer/footer"
import { ToppingProps, toppingSData } from "../../helpers/pizzaToppingsData"

const pizzaIcon = require("../../../assets/images/icons/pizza.png")
const cartIcon = require("../../../assets/images/icons/cart-red.png")
const pizza = require("./pizza-confirm.png")

const SCREEN_WIDTH = Dimensions.get("screen").width
const SCREEN_HEIGHT = Dimensions.get("screen").height
const PIZZA_WIDTH = SCREEN_WIDTH + 100

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.backgroundLightGrey,
  height: SCREEN_HEIGHT,
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
}
const CHECK_PIZZA_TITLE_BOLD: TextStyle = {
  ...CHECK_PIZZA_TITLE,
  fontFamily: typography.bold,
}
const PIZZA_WRAPPER: ViewStyle = {
  padding: 25,
  borderRadius: PIZZA_WIDTH / 2,
  overflow: "hidden",
  width: PIZZA_WIDTH,
  height: PIZZA_WIDTH,
  position: "absolute",
  top: 60,
  right: -(SCREEN_WIDTH / 1.8),
}
const PIZZA_VIEW: ViewStyle = {
  padding: 25,
  borderRadius: PIZZA_WIDTH / 2,
  backgroundColor: color.palette.white,
  width: PIZZA_WIDTH - 50,
  height: PIZZA_WIDTH - 50,
}
const PIZZA_IMG: ImageStyle = {
  flex: 1,
  width: null,
  height: null,
}
const ORDER_REVIEW_CONTAINER: ViewStyle = {
  position: "absolute",
  top: 235,
  left: 0,
  borderRadius: 20,
  width: SCREEN_WIDTH / 1.5,
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
}
const ORDER_REVIEW_HEADER: ViewStyle = {
  paddingHorizontal: spacing[5],
  paddingTop: spacing[7],
  paddingBottom: 15,
  borderBottomWidth: 0.5,
  borderColor: color.palette.stroke,
}
const ORDER_REVIEW_FOOTER: ViewStyle = {
  paddingHorizontal: spacing[5],
  paddingBottom: spacing[7],
  paddingTop: 15,
  borderTopWidth: 0.5,
  borderColor: color.palette.stroke,
}
const CART_REVIEW_ICON: ImageStyle = {
  width: spacing[4] + 2,
  height: spacing[4] + 2,
  marginBottom: spacing[1],
}
const ORDER_SUMMARY_TEXT: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
  color: color.palette.red,
}
const ORDER_REVIEW_BODY: ViewStyle = {
  paddingTop: spacing[4] + 2,
  paddingBottom: spacing[5] + 4,
  paddingHorizontal: spacing[5],
}
const ROW_SPACE_BETWEEN: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const ORDER_REVIEW_TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  lineHeight: spacing[4] + 4,
}
const ORDER_REVIEW_PRICE: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
}
const ORDER_TOTAL_PRICE: TextStyle = {
  fontSize: spacing[4] + 4,
  fontFamily: typography.bold,
}

const firstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const CheckPizzaScreen: FC<StackScreenProps<NavigatorParamList, "check-pizza">> = observer(
  ({ route, navigation }) => {
    const { size = "", crust, price: totalPrice, toppingSelected } = route.params || {}

    const pizzaPrice = useMemo<number>(() => {
      switch (size) {
        case "small":
          return 8
        case "large":
          return 12
        default:
          return 10
      }
    }, [size])

    const crustPrice = useMemo<number>(() => {
      if (crust === "thin") return 2
      if (crust === "thick") return 4
      return 0
    }, [crust])

    const toppingsFilter = useMemo<Array<ToppingProps>>(() => {
      if (!toppingSelected || toppingSelected.length === 0) return []

      const arr = []
      toppingSData.filter((item) =>
        toppingSelected.forEach((selected) => {
          if (item.id === selected) {
            arr.push(item)
          }
        }),
      )

      return arr
    }, [toppingSelected, toppingSData])

    const onNextPress = () => {
      navigation.navigate("checkout", { price: totalPrice })
    }

    return (
      <View testID="CheckPizzaScreen" style={FULL}>
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
          footer={<Footer title="Confirm Pizza" onPress={onNextPress} />}
        >
          <GradientBackground height={170} />
          <View style={SUB_CONTAINER}>
            <Image source={pizzaIcon} resizeMode="contain" style={PIZZA_ICON} />
            <Text style={CHECK_PIZZA_TITLE}>
              Check your{"\n"}
              <Text style={CHECK_PIZZA_TITLE_BOLD}>custom pizza</Text>
            </Text>

            <BlurView intensity={100} style={PIZZA_WRAPPER}>
              <View style={PIZZA_VIEW}>
                <Image source={pizza} style={PIZZA_IMG} resizeMode="contain" />
              </View>
            </BlurView>
          </View>

          <View style={ORDER_REVIEW_CONTAINER}>
            <BlurView intensity={100}>
              <View style={ORDER_REVIEW_HEADER}>
                <Image source={cartIcon} resizeMode="contain" style={CART_REVIEW_ICON} />
                <Text style={ORDER_SUMMARY_TEXT}>order summary</Text>
              </View>
              <View style={ORDER_REVIEW_BODY}>
                <View style={ROW_SPACE_BETWEEN}>
                  <Text style={ORDER_REVIEW_TEXT}>{firstLetter(size)} Size</Text>
                  <Text style={ORDER_REVIEW_PRICE}>${pizzaPrice.toFixed(2)}</Text>
                </View>
                <View style={ROW_SPACE_BETWEEN}>
                  <Text style={ORDER_REVIEW_TEXT}>{firstLetter(crust)} Crust</Text>
                  <Text style={ORDER_REVIEW_PRICE}>${crustPrice.toFixed(2)}</Text>
                </View>
                {toppingsFilter && toppingsFilter.length > 0
                  ? toppingsFilter.map((item) => (
                      <View style={ROW_SPACE_BETWEEN} key={item.id}>
                        <Text style={ORDER_REVIEW_TEXT}>{item.title}</Text>
                        <Text style={ORDER_REVIEW_PRICE}>${item.price.toFixed(2)}</Text>
                      </View>
                    ))
                  : null}
              </View>
              <View style={ORDER_REVIEW_FOOTER}>
                <View style={ROW_SPACE_BETWEEN}>
                  <Text style={ORDER_REVIEW_TEXT}>Total</Text>
                  <Text style={ORDER_TOTAL_PRICE}>${totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            </BlurView>
          </View>
        </Screen>
      </View>
    )
  },
)
