type Category = "important" | "notice" | "event";

interface NoticeProps {
  category: Category;
  title: string;
  date: string;
}

export const notices: NoticeProps[] = [
  {
    category: "important",
    title: "축제 일정 안내입니다",
    date: "04/01 12:00",
  },
  {
    category: "notice",
    title: "일반 공지입니다",
    date: "04/02 13:00",
  },
  {
    category: "event",
    title: "이벤트 참여하세요!",
    date: "04/03 14:00",
  },
];
