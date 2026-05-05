type Category = "important" | "notice" | "event";

interface NoticeProps {
  id: number;
  category: Category;
  title: string;
  date: string;
  content: string;
}

export const notices: NoticeProps[] = [
  {
    id: 1,
    category: "important",
    title: "축제 일정 안내입니다",
    date: "04/01 12:00",
    content: "내용",
  },
  {
    id: 2,
    category: "notice",
    title: "일반 공지입니다",
    date: "04/02 13:00",
    content: "내용",
  },
  {
    id: 3,
    category: "event",
    title: "이벤트 참여하세요!",
    date: "04/03 14:00",
    content: "내용",
  },
];
