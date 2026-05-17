import { fetcher } from "./fetcher";
import { Notice, NoticeParams, NoticeResponse } from "@/types/notice";

export const noticeApi = {
  // 공지사항 목록 조회 (페이지네이션 적용)
  getNotices: ({
    page = 0,
    size = 10,
    sort = ["createdAt,desc"],
  }: NoticeParams = {}) => {
    // 쿼리 스트링 생성
    const queryString = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    // sort는 배열일 수 있으므로 반복문으로 추가 (API 규격에 따라 다름)
    sort.forEach((s) => queryString.append("sort", s));

    return fetcher<NoticeResponse>(`/notice?${queryString.toString()}`);
  },

  getNoticeDetail: (noticeId: number) => fetcher<Notice>(`/notice/${noticeId}`),
};
