export interface ApiResponse<T> {
    success: boolean
    data: T
    message: string
  }
  
export interface TopBooth {
    booth_id: number
    location_id: number
    booth_image: string
    location: string
    booth_name: string
    owner: string
    like_count: number
    is_liked: boolean
  }
  
export interface Promotion {
    id: number
    instagram: string
    image: string
  }
  
  export interface LiveStage {
    stage_id: number
    performer: string
    logo: string
    time: string
  }
  
  export interface HotFood {
    id: number
    name: string
    image: string
    bestMenu: string
    likeCount: number
    liked: boolean
  }
  
  export interface ActiveNotice {
    id: number
    title: string
  }
