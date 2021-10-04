/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import {
  HomeScreen,
  ChooseSizeScreen,
  ChooseCrustScreen,
  ChooseToppingScreen,
  CheckPizzaScreen,
  CheckoutScreen,
  OrderDetailScreen,
} from "../screens"
import { navigationRef } from "./navigation-utilities"
import { DrawerContent } from "./drawer-content"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  home: undefined
  "choose-size": undefined
  "choose-crust": { size: string; price: number }
  "choose-topping": { size: string; crust: string; price: number }
  "check-pizza": { size: string; crust: string; price: number; toppingSelected: Array<number> }
  checkout: { price: number }
  "order-details": { price: number }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Drawer = createDrawerNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="choose-size" component={ChooseSizeScreen} />
      <Stack.Screen name="choose-crust" component={ChooseCrustScreen} />
      <Stack.Screen name="choose-topping" component={ChooseToppingScreen} />
      <Stack.Screen name="check-pizza" component={CheckPizzaScreen} />
      <Stack.Screen name="checkout" component={CheckoutScreen} />
      <Stack.Screen name="order-details" component={OrderDetailScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Drawer.Navigator
        initialRouteName="app"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="app" component={AppStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
