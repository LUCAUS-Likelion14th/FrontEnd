export type BoothLike = {
    booth_id: number
    location_id: number
    booth_image: string
    booth_name: string
    booth_owner: string
    booth_location: string
    is_liked: boolean
    like_count: number
  }
  
  export type FoodLike = {
    food_id: number
    location_id: number
    image: string
    food_name: string
    best_food: string
    location: string
    is_liked: boolean
    like_count: number
  }
  
  export type MyPageData = {
    name: string
    like_count: number
    booth_like_list: BoothLike[]
    food_like_list: FoodLike[]
    stamp_count: number
  }