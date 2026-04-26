import { fetcher } from "./fetcher";
import type {
  TopBooth,
  Promotion,
  LiveStage,
  HotFood,
  ActiveNotice,
} from "@/types/home";

export const homeApi = {
  getTopBooth: () => fetcher<TopBooth[]>("/top-booth"),
  getPromotion: () => fetcher<Promotion[]>("/promotion"),
  getLiveStage: () => fetcher<LiveStage[]>("/live-stage"),
  getHotFood: () => fetcher<HotFood[]>("/hot-food"),
  getActiveNotice: () => fetcher<ActiveNotice[]>("/active-notice"),
};
