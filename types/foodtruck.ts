export type MenuItem = {
  menu_name: string
  menu_price: string
  menu_image: string
  menu_info: string
}

export type FoodTruckDetail = {
  food_id: number
  location_id: number
  food_name: string
  image: string
  food_info: string
  location: string
  is_liked: boolean
  like_count: number
  date: string[]
  food_menu: MenuItem[]
}