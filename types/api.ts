import type { ApiResponse, TopBooth, Promotion, LiveStage, HotFood, ActiveNotice } from '@/types/home'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`)
  }
  const json: ApiResponse<T> = await res.json()

  if (!json.success) {
    throw new Error(json.message)
  }

  return json.data
}

export const homeApi = {
  getTopBooth:     () => fetcher<TopBooth[]>('/top-booth'),
  getPromotion:    () => fetcher<Promotion[]>('/promotion'),
  getLiveStage:    () => fetcher<LiveStage[]>('/live-stage'),
  getHotFood:      () => fetcher<HotFood[]>('/hot-food'),
  getActiveNotice: () => fetcher<ActiveNotice[]>('/active-notice'),
}