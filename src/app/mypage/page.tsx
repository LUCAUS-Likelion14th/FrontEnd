import { mypageApi } from "@/lib/api/mypageApi";
import { MypageClient } from '@/components'
import { MyPageData } from "@/types/mypage";

const EMPTY_MYPAGE_DATA: MyPageData = {
  name: "",
  like_count: 0,
  booth_like_list: [],
  food_truck_like_list: [],
  stamp_count: 0,
};

export default async function MyPage() {
  const isLoggedIn = true; // TODO: 실제 인증 상태로 변경

  let data = EMPTY_MYPAGE_DATA;
  if (isLoggedIn) {
    try {
      data = await mypageApi.getMyPage();
    } catch (error) {
      console.error("Failed to fetch mypage:", error);
    }
  }

  return <MypageClient isLoggedIn={isLoggedIn} data={data} />;
}
