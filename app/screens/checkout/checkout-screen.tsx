import React, { FC, useState, useRef, useEffect } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Footer } from "../../components/footer/footer"

const LinearGradientAnimated = Animated.createAnimatedComponent(LinearGradient)

const cartWhiteIcon = require("../../../assets/images/icons/cart-white.png")
const pencilIcon = require("../../../assets/images/icons/pencil.png")
const walletIcon = require("../../../assets/images/icons/wallets.png")
const visaIcon = require("../../../assets/images/icons/visa.png")
const pinIcon = require("../../../assets/images/icons/pin.png")

const THUMB_SIZE = 18
const SWITCH_WIDTH = 38
const SWITCH_HEIGHT = 21
const MARGIN = 2
const OFF_POSITION = -0.5
const ON_POSITION = SWITCH_WIDTH - THUMB_SIZE - MARGIN - 2
const TRACK_COLOR_ON = [color.palette.lightRed, color.palette.lightOrange]
const TRACK_COLOR_OFF = [color.palette.lightGrey, color.palette.lightGrey]
const THUMB_COLOR_ON = [color.palette.red, color.palette.orange]
const THUMB_COLOR_OFF = [color.palette.white, color.palette.white]

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
const CHECKOUT_SECTION_CONTAINER: ViewStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  marginTop: spacing[3] + 2,
  borderRadius: 20,
  overflow: "hidden",
}
const SECTION_HEADER: ViewStyle = {
  paddingTop: spacing[5] + 2,
  paddingBottom: spacing[4],
  paddingHorizontal: spacing[5] + 1,
  borderBottomWidth: 0.5,
  borderColor: color.palette.stroke,
}
const SECTION_BODY: ViewStyle = {
  paddingHorizontal: spacing[5] + 1,
  borderBottomWidth: 0.5,
  borderColor: color.palette.stroke,
  paddingVertical: spacing[4] + 4,
}
const SECTION_FOOTER: ViewStyle = {
  paddingHorizontal: spacing[5] + 1,
  paddingTop: 30,
  paddingBottom: 25,
}
const ROW_SPACE_BETWEEN: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const ICON_ROW: ImageStyle = {
  width: spacing[5],
  height: spacing[5],
  marginRight: spacing[2],
}
const TITLE: TextStyle = {
  fontSize: spacing[4] + 4,
  fontFamily: typography.bold,
  color: color.palette.red,
}
const ICON_RIGHT: ViewStyle = {
  marginLeft: "auto",
}
const ICON_PENCIL_GRADIENT: ViewStyle = {
  width: spacing[5] + 1,
  height: spacing[5] + 1,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: (spacing[5] + 1) / 2,
}
const ICON_PENCIL: ImageStyle = {
  width: 11,
  height: 11,
}
const TEXT_NORMAL: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
  marginTop: 6,
}
const TEXT_BOLD: TextStyle = {
  ...TEXT_NORMAL,
  fontFamily: typography.bold,
  marginTop: 0,
}
const VISA_WRAPPER: ViewStyle = {
  flexDirection: "row",
}
const VISA_ICON: ImageStyle = {
  width: 28,
  height: 28,
  marginRight: 26,
}
const VISA_TEXT: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  textTransform: "uppercase",
}
const VISA_NUMBER: TextStyle = {
  fontSize: spacing[3] + 2,
  color: color.palette.lightPurple,
}
const TOTAL_PRICE: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.bold,
  marginLeft: "auto",
  alignSelf: "flex-end",
}
const CASH_BACK: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  color: color.palette.green,
  textTransform: "uppercase",
  marginTop: 5,
  paddingHorizontal: 20,
  paddingVertical: 7,
  backgroundColor: color.palette.lightGreen,
  alignSelf: "flex-start",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 10,
}
const SWITCH_BUTTON: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 50,
  overflow: "hidden",
}
const SWITCH_WRAPPER: ViewStyle = {
  width: SWITCH_WIDTH,
  height: SWITCH_HEIGHT,
  justifyContent: "center",
  paddingHorizontal: MARGIN,
}
const SWITCH_CIRCLE: ViewStyle = {
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  backgroundColor: color.palette.white,
  borderRadius: 9,
}
const NO_BORDER: ViewStyle = {
  borderBottomWidth: 0,
  borderTopWidth: 0,
}
const MARGIN_BOTTOM: ViewStyle = {
  marginBottom: 18,
}

export const CheckoutScreen: FC<StackScreenProps<NavigatorParamList, "checkout">> = observer(
  ({ route, navigation }) => {
    const { price: totalPrice } = route.params || {}
    const [isSwitch, setSwitch] = useState<boolean>(false)
    const animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
      const toValue = isSwitch ? 1 : 0
      const easing = Easing.out(Easing.circle)
      Animated.timing(animation, {
        toValue,
        duration: 100,
        easing,
        useNativeDriver: true,
      }).start()
    }, [isSwitch])

    const onToggleSwitch = () => {
      setSwitch(!isSwitch)
    }

    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [OFF_POSITION, ON_POSITION],
    })

    const thumbStyle = [
      SWITCH_CIRCLE,
      {
        transform: [{ translateX }],
      },
    ]
    const trackColors = isSwitch ? TRACK_COLOR_ON : TRACK_COLOR_OFF
    const thumbColors = isSwitch ? THUMB_COLOR_ON : THUMB_COLOR_OFF

    const onNextPress = () => {
      navigation.navigate("order-details", { price: totalPrice })
    }

    return (
      <View testID="CheckoutScreen" style={FULL}>
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
          footer={<Footer title="Place Order" onPress={onNextPress} />}
        >
          <GradientBackground height={200} />
          <View style={SUB_CONTAINER}>
            <Image source={cartWhiteIcon} resizeMode="contain" style={PIZZA_ICON} />
            <Text style={CHECK_PIZZA_TITLE}>Checkout</Text>

            <View style={CHECKOUT_SECTION_CONTAINER}>
              <BlurView intensity={100}>
                <View style={SECTION_HEADER}>
                  <View style={[ROW_SPACE_BETWEEN, MARGIN_BOTTOM]}>
                    <Image source={pinIcon} resizeMode="contain" style={ICON_ROW} />
                    <Text style={TITLE}>Delivery Address</Text>
                    <TouchableOpacity style={ICON_RIGHT}>
                      <LinearGradient
                        colors={[color.palette.red, color.palette.orange]}
                        start={[0.0, 0.5]}
                        end={[1.0, 0.5]}
                        locations={[0.0, 1.0]}
                        style={ICON_PENCIL_GRADIENT}
                      >
                        <Image source={pencilIcon} resizeMode="contain" style={ICON_PENCIL} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text style={TEXT_BOLD}>Home</Text>
                  <Text style={TEXT_NORMAL}>3728 Brand Road, Swift Current</Text>
                </View>
                <View style={SECTION_BODY}>
                  <Text style={TEXT_BOLD}>+{"   "}Add delivery instruction</Text>
                </View>
                <View style={SECTION_FOOTER}>
                  <View style={ROW_SPACE_BETWEEN}>
                    <View>
                      <Text style={TEXT_BOLD}>Contactless Delivery:</Text>
                      <Text style={TEXT_NORMAL}>Rider will place order at your door</Text>
                    </View>
                    <TouchableOpacity onPress={onToggleSwitch} style={SWITCH_BUTTON}>
                      <LinearGradientAnimated
                        colors={trackColors}
                        start={[0.0, 0.5]}
                        end={[1.0, 0.5]}
                        locations={[0.0, 1.0]}
                        style={SWITCH_WRAPPER}
                      >
                        <LinearGradientAnimated
                          colors={thumbColors}
                          start={[0.0, 0.5]}
                          end={[1.0, 0.5]}
                          locations={[0.0, 1.0]}
                          style={thumbStyle}
                        />
                      </LinearGradientAnimated>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </View>

            <View style={CHECKOUT_SECTION_CONTAINER}>
              <BlurView intensity={100}>
                <View style={[SECTION_HEADER, NO_BORDER]}>
                  <View style={[ROW_SPACE_BETWEEN, MARGIN_BOTTOM]}>
                    <Image source={walletIcon} resizeMode="contain" style={ICON_ROW} />
                    <Text style={TITLE}>Payment method</Text>
                    <TouchableOpacity style={ICON_RIGHT}>
                      <LinearGradient
                        colors={[color.palette.red, color.palette.orange]}
                        start={[0.0, 0.5]}
                        end={[1.0, 0.5]}
                        locations={[0.0, 1.0]}
                        style={ICON_PENCIL_GRADIENT}
                      >
                        <Image source={pencilIcon} resizeMode="contain" style={ICON_PENCIL} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <View style={VISA_WRAPPER}>
                    <Image source={visaIcon} resizeMode="contain" style={VISA_ICON} />
                    <View>
                      <Text style={VISA_TEXT}>Visa</Text>
                      <Text style={VISA_NUMBER}>....0145</Text>
                    </View>
                    <Text style={TOTAL_PRICE}>$ {totalPrice.toFixed(2)}</Text>
                  </View>
                  <Text style={CASH_BACK}>10% Cashback Applied</Text>
                </View>
              </BlurView>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)
