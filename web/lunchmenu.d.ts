type LunchMenu = {
  name: str
  type: str
  brand: str
  price: number
  img?: str
  chance?: {
    weight?: number
    less?: number
  }
}