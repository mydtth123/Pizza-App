import React, { FC, useState, useMemo } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  FlatList,
  Image,
  ImageStyle,
  Dimensions,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Footer } from "../../components/footer/footer"
import { PizzaItem } from "../../components/pizza-item/pizza-item"
import { toppingSData } from "../../helpers/pizzaToppingsData"

const SCREEN_HEIGHT = Dimensions.get("screen").height

const check = require("../../../assets/images/icons/check.png")

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
const OPTIONS_TEXT_WHITE: TextStyle = {
  ...OPTIONS_TEXT,
  color: color.palette.white,
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
  height: 180,
}
const CHOOSE_TEXT: TextStyle = {
  fontSize: spacing[4] + 4,
  textAlign: "center",
}
const CHOOSE_TEXT_BOLD: TextStyle = {
  ...CHOOSE_TEXT,
  fontFamily: typography.bold,
}
const CHOOSE_BUTTON_GROUP: ViewStyle = {
  position: "absolute",
  bottom: 65,
  left: 0,
  right: 0,
}
const TOPPING_OPTION_ITEM: ViewStyle = {
  width: 230,
  height: 76,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 0.5,
  borderColor: color.palette.stroke,
  borderRadius: 20,
  paddingLeft: spacing[2],
  paddingRight: 20,
  backgroundColor: color.palette.white,
}
const IMAGE_SLIDE: ImageStyle = {
  width: 74,
  height: 74,
}
const TOPPING_TEXT_WRAP: ViewStyle = {
  marginLeft: spacing[3],
}
const TOPPING_TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.bold,
}
const TOPPING_PRICE: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.light,
}
const TOPPING_CHECKBOX: ViewStyle = {
  width: 30,
  height: 30,
  marginLeft: "auto",
  marginTop: 20,
  alignItems: "center",
  justifyContent: "center",
}
const TOPPING_CHECKBOX_GRADIENT: ViewStyle = {
  width: 20,
  height: 20,
  borderWidth: 1,
  borderColor: color.palette.stroke,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
}
const CHECK_ICON: ImageStyle = {
  width: 12,
  height: 12,
}
const FLAT_LIST: ViewStyle = {}
const ITEM_HEADER: ViewStyle = {
  width: 40,
}
const ITEM_FOOTER: ViewStyle = {
  width: 20,
}
const SEPARATOR: ViewStyle = {
  width: 12,
}

export const ChooseToppingScreen: FC<
  StackScreenProps<NavigatorParamList, "choose-topping">
> = observer(({ route, navigation }) => {
  const { size = "", price, crust } = route.params || {}
  const [toppingSelected, setToppingSelected] = useState<Array<number>>([])

  const pizzaPrice = useMemo<number>(() => {
    let currentPrice = price

    toppingSelected.forEach((item) => {
      toppingSData.forEach((data) => {
        if (item === data.id) {
          currentPrice += data.price
        }
      })
    })

    return currentPrice
  }, [price, crust, toppingSelected, toppingSData])

  const onNextPress = () => {
    navigation.navigate("check-pizza", { size, crust, price: pizzaPrice, toppingSelected })
  }

  const onToppingItemPress = (id) => {
    const newArr = [...toppingSelected]
    const i = newArr.indexOf(id)

    if (i === -1) newArr.push(id)
    else newArr.splice(i, 1)

    setToppingSelected(newArr)
  }

  const renderItem = ({ item }) => {
    const active = toppingSelected.includes(item.id)

    return (
      <View style={TOPPING_OPTION_ITEM}>
        <Image source={item.image} resizeMode="contain" style={IMAGE_SLIDE} />
        <View style={TOPPING_TEXT_WRAP}>
          <Text style={TOPPING_TEXT}>{item.title}</Text>
          <Text style={TOPPING_PRICE}>+ ${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={TOPPING_CHECKBOX} onPress={() => onToppingItemPress(item.id)}>
          <LinearGradient
            colors={
              active
                ? [color.palette.red, color.palette.orange]
                : [color.palette.lightGrey, color.palette.lightGrey]
            }
            start={[0.0, 0.5]}
            end={[1.0, 0.5]}
            locations={[0.0, 1.0]}
            style={TOPPING_CHECKBOX_GRADIENT}
          >
            {active ? <Image source={check} resizeMode="contain" style={CHECK_ICON} /> : null}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View testID="ChooseToppingScreen" style={FULL}>
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
          <Text style={OPTIONS_TEXT}>
            <Text style={OPTIONS_TEXT_WHITE}>{size}</Text>,{" "}
            <Text style={OPTIONS_TEXT_WHITE}>{crust} crust</Text>, toppings
          </Text>
        </View>
        <PizzaItem size={size} crust={crust} toppingSelected={toppingSelected} />
        <View style={CHOOSE_FORM}>
          <Text style={CHOOSE_TEXT}>
            Choose up to 7 <Text style={CHOOSE_TEXT_BOLD}>toppings</Text>
          </Text>
        </View>
        <View style={CHOOSE_BUTTON_GROUP}>
          <FlatList
            data={toppingSData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            ListFooterComponent={() => <View style={ITEM_FOOTER} />}
            ListHeaderComponent={() => <View style={ITEM_HEADER} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={SEPARATOR} />}
            style={FLAT_LIST}
          />
        </View>
      </Screen>
    </View>
  )
})
