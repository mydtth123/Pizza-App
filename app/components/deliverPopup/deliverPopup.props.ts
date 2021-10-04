export interface DeliverData {
  id: number
  title: string
  text: string
  icon: any
}

export interface DeliverPopupProps {
  /**
   * Is the popup visible?
   */
  isVisible?: boolean

  /**
   * On item press function
   */
  onItemPress?: (DeliverData) => void
}
