import { fetcher } from "./fetcher";
import type { BoothDetail } from "@/types/booth";

export const BoothApi = {
  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),
};
