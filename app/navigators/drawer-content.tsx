import React from "react"
import { View, Text, Image, ViewStyle, ImageStyle, Dimensions, TextStyle } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { color, spacing, typography } from "../theme"

const SCREEN_HEIGHT = Dimensions.get("screen").height
const setting = require("../../assets/images/icons/settings.png")
const logout = require("../../assets/images/icons/logout.png")

const data = [
  {
    id: 1,
    routeName: "Profile",
    icon: require("../../assets/images/icons/profile.png"),
  },
  {
    id: 2,
    routeName: "Payment Method",
    icon: require("../../assets/images/icons/payment.png"),
  },
  {
    id: 3,
    routeName: "Order History",
    icon: require("../../assets/images/icons/order.png"),
  },
  {
    id: 4,
    routeName: "Addresses",
    icon: require("../../assets/images/icons/pin.png"),
  },
  {
    id: 5,
    routeName: "Help Center",
    icon: require("../../assets/images/icons/help.png"),
  },
]

const DRAWER_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  flex: 1,
}
const CONTENT_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.lightGrey,
  height: SCREEN_HEIGHT - 420,
  paddingTop: 60,
}
const HEADER_WRAPPER: ViewStyle = {
  paddingTop: 55,
  paddingBottom: 35,
  borderBottomWidth: 0.5,
  borderColor: color.palette.stroke,
}
const PROFILE_ICON: ImageStyle = {
  width: "100%",
  height: 100,
}
const NAME_TEXT: TextStyle = {
  fontSize: spacing[4] + 2,
  fontFamily: typography.bold,
  color: color.palette.purple,
  textAlign: "center",
}
const EMAIL_TEXT: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.primary,
  color: color.palette.purple,
  textAlign: "center",
  marginTop: spacing[1] + 1,
}
const DRAWER_ITEM: ViewStyle = {
  paddingLeft: 30,
}
const ICON: ImageStyle = {
  width: spacing[5],
  height: spacing[5],
}
const LABEL: TextStyle = {
  fontSize: spacing[3] + 2,
  fontFamily: typography.primary,
  color: color.palette.purple,
}
const FOOTER_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  marginTop: "auto",
}

export function DrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      style={DRAWER_CONTAINER}
      showsVerticalScrollIndicator={false}
    >
      <View style={HEADER_WRAPPER}>
        <Image
          source={require("../../assets/images/profile-icon.png")}
          style={PROFILE_ICON}
          resizeMode="contain"
        />
        <Text style={NAME_TEXT}>Jaykey del Mar</Text>
        <Text style={EMAIL_TEXT}>janedone@gmail.com</Text>
      </View>

      <View style={CONTENT_CONTAINER}>
        {data.map((item) => (
          <DrawerItem
            key={item.id}
            icon={() => <Image source={item.icon} style={ICON} resizeMode="contain" />}
            label={item.routeName}
            onPress={() => {
              // do nothing
            }}
            style={DRAWER_ITEM}
            labelStyle={LABEL}
          />
        ))}
      </View>
      <View style={FOOTER_CONTAINER}>
        <DrawerItem
          icon={() => <Image source={setting} style={ICON} resizeMode="contain" />}
          label="Settings"
          onPress={() => {
            // do nothing
          }}
          style={DRAWER_ITEM}
          labelStyle={LABEL}
        />
        <DrawerItem
          icon={() => <Image source={logout} style={ICON} resizeMode="contain" />}
          label="Log out"
          onPress={() => {
            // do nothing
          }}
          style={DRAWER_ITEM}
          labelStyle={LABEL}
        />
      </View>
    </DrawerContentScrollView>
  )
}
