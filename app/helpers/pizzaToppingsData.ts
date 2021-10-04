export interface ToppingProps {
  id: number
  title: string
  price: number
  image: number
}

export const toppingSData: Array<ToppingProps> = [
  {
    id: 1,
    title: "Pepperoni",
    price: 0,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 2,
    title: "Mushrooms",
    price: 0,
    image: require("../screens/choose-topping/mushrooms.png"),
  },
  {
    id: 3,
    title: "Black Olives",
    price: 0,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 4,
    title: "Sausages",
    price: 0.5,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 5,
    title: "Bacon",
    price: 1,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 6,
    title: "Extra Cheese",
    price: 0.4,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 7,
    title: "Green Peppers",
    price: 0.5,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 8,
    title: "Pineapple",
    price: 0.6,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 9,
    title: "Spinach",
    price: 0.3,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
  {
    id: 10,
    title: "Onions",
    price: 0.2,
    image: require("../screens/choose-topping/pepperoni.png"),
  },
]
