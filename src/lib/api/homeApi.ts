import { fetcher } from "./fetcher";
import type {
  TopBooth,
  Promotion,
  LiveStage,
  HotFood,
  ActiveNotice,
} from "@/types/home";

export const homeApi = {
  getTopBooth: () => fetcher<TopBooth[]>("/top-booth", { revalidate: 60 }),
  getPromotion: () => fetcher<Promotion[]>("/promotion", { revalidate: 300 }),
  getLiveStage: () => fetcher<LiveStage[]>("/live-stage", { revalidate: 30 }),
  getHotFood: () => fetcher<HotFood[]>("/hot-food", { revalidate: 60 }),
  getActiveNotice: () => fetcher<ActiveNotice>("/active-notice", { revalidate: 60 }),
};
