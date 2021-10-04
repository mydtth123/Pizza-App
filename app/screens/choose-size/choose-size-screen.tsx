import React, { FC, useState, useMemo } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Footer } from "../../components/footer/footer"
import { PizzaItem } from "../../components/pizza-item/pizza-item"

const SCREEN_HEIGHT = Dimensions.get("screen").height

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.backgroundLightGrey,
  height: SCREEN_HEIGHT - 120,
}
const SUB_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4] + 4,
}
const ROW_SPACE_BETWEEN: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const HEADER_TEXT: TextStyle = {
  fontSize: spacing[5] + 1,
  fontFamily: typography.light,
  color: color.palette.white,
  marginTop: 20,
}
const TOTAL_TEXT: TextStyle = {
  ...HEADER_TEXT,
  fontFamily: typography.bold,
}
const OPTIONS_TEXT: TextStyle = {
  fontSize: spacing[2] + 2,
  fontFamily: typography.bold,
  color: color.palette.white3,
  textTransform: "uppercase",
  marginTop: spacing[1],
}
const CHOOSE_FORM: ViewStyle = {
  paddingTop: spacing[5] + 1,
  paddingBottom: spacing[6],
  backgroundColor: color.palette.white,
  borderRadius: 20,
  marginTop: 20,
  position: "absolute",
  bottom: 38,
  left: 20,
  right: 20,
}
const CHOOSE_TEXT: TextStyle = {
  fontSize: spacing[4] + 4,
  textAlign: "center",
}
const CHOOSE_TEXT_BOLD: TextStyle = {
  ...CHOOSE_TEXT,
  fontFamily: typography.bold,
}
const LINEAR_GRADIENT_BUTTON: ViewStyle = {
  width: 98,
  height: 38,
  borderRadius: 20,
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
}
const BUTTON_TEXT: TextStyle = {
  fontSize: spacing[4] - 1,
  fontFamily: typography.light,
}
const BUTTON_TEXT_ACTIVE: TextStyle = {
  fontSize: spacing[4] - 1,
  fontFamily: typography.bold,
  color: color.palette.white,
}
const CHOOSE_BUTTON_GROUP: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: spacing[4] + 4,
}

export const ChooseSizeScreen: FC<StackScreenProps<NavigatorParamList, "choose-size">> = observer(
  ({ navigation }) => {
    const [size, setSize] = useState<string>("medium")

    const buttonData = useMemo(() => {
      return [
        {
          id: 1,
          title: "Small",
          active: size === "small",
          onPress: () => setSize("small"),
        },
        {
          id: 2,
          title: "Medium",
          active: size === "medium",
          onPress: () => setSize("medium"),
        },
        {
          id: 3,
          title: "Large",
          active: size === "large",
          onPress: () => setSize("large"),
        },
      ]
    }, [size])

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

    const onNextPress = () => {
      navigation.navigate("choose-crust", { size, price: pizzaPrice })
    }

    return (
      <View testID="ChooseSizeScreen" style={FULL}>
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
          footer={<Footer title="Next" onPress={onNextPress} />}
        >
          <GradientBackground height={285} />
          <View style={SUB_CONTAINER}>
            <View style={ROW_SPACE_BETWEEN}>
              <Text style={HEADER_TEXT}>Create Your Pizza</Text>
              <Text style={TOTAL_TEXT}>${pizzaPrice.toFixed(2)}</Text>
            </View>
            <Text style={OPTIONS_TEXT}>size, crust, toppings</Text>
          </View>
          <PizzaItem size={size} showSizeText />
          <View style={CHOOSE_FORM}>
            <Text style={CHOOSE_TEXT}>
              Choose your <Text style={CHOOSE_TEXT_BOLD}>size</Text>
            </Text>
            <View style={CHOOSE_BUTTON_GROUP}>
              {buttonData.map((item) => {
                const colorGradient = item.active
                  ? [color.palette.red, color.palette.orange]
                  : [color.palette.transparent, color.palette.transparent]
                return (
                  <TouchableOpacity key={item.id} onPress={item.onPress}>
                    <LinearGradient
                      colors={colorGradient}
                      start={[0.0, 0.5]}
                      end={[1.0, 0.5]}
                      locations={[0.0, 1.0]}
                      style={LINEAR_GRADIENT_BUTTON}
                    >
                      <Text style={item.active ? BUTTON_TEXT_ACTIVE : BUTTON_TEXT}>
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)
