import { fetcher } from "./fetcher";
import type {
  TopBooth,
  Promotion,
  LiveStage,
  HotFood,
  ActiveNotice,
} from "@/types/home";

export const homeApi = {
  getTopBooth: () => fetcher<TopBooth[]>("/top-booth", { revalidate: 0 }),
  getPromotion: () => fetcher<Promotion[]>("/promotion", { revalidate: 0 }),
  getLiveStage: () => fetcher<LiveStage[]>("/live-stage", { revalidate: 0 }),
  getHotFood: () => fetcher<HotFood[]>("/hot-food", { revalidate: 0 }),
  getActiveNotice: () => fetcher<ActiveNotice>("/active-notice", { revalidate: 0 }),
};