import { fetcher } from "./fetcher";
import { Notice, NoticeParams, NoticeResponse } from "@/types/notice";
import { MOCK_NOTICES } from "@/data/noticeData";

function mockNoticeResponse(page: number, size: number): NoticeResponse {
  const start = page * size;
  return {
    content: MOCK_NOTICES.slice(start, start + size),
    totalPages: Math.max(1, Math.ceil(MOCK_NOTICES.length / size)),
  };
}

export const noticeApi = {
  // 공지사항 목록 조회 (페이지네이션 적용)
  getNotices: async ({
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

    try {
      return await fetcher<NoticeResponse>(`/notice?${queryString.toString()}`);
    } catch (error) {
      console.warn("공지 목록 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return mockNoticeResponse(page, size);
    }
  },

  getNoticeDetail: async (noticeId: number) => {
    try {
      return await fetcher<Notice>(`/notice/${noticeId}`);
    } catch (error) {
      console.warn("공지 상세 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return MOCK_NOTICES.find((n) => n.id === noticeId) as Notice;
    }
  },
};
