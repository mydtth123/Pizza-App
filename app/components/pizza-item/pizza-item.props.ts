export interface PizzaItemProps {
  /**
   * Size of pizza
   */
  size?: string

  /**
   * Crust of pizza
   */
  crust?: string

  /**
   * Topping selected
   */
  toppingSelected?: Array<number>

  /**
   * Show size of pizza
   */
  showSizeText?: boolean

  /**
   * Show crust of pizza
   */
  showCrustText?: boolean
}
