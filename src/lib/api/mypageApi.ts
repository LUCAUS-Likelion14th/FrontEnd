import { fetcher } from "./fetcher";
import type { MyPageData } from "@/types/mypage";

export const mypageApi = {
  getMyPage: () => fetcher<MyPageData>("/mypage"),
};
