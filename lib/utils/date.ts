export const formatDate = (
  dateStr: string | undefined | null,
  type: "time" | "date" | "detail" | "notice" | "dot",
) => {
  if (!dateStr) return "";

  // 문자열 자르기
  const [datePart, timePart] = dateStr.split("T");
  const [yyyy, mm, dd] = datePart.split("-");
  const hhmm = timePart ? timePart.slice(0, 5) : "";

  switch (type) {
    case "time": // 18:00 (StageTimeline, StageEventSection)
      return hhmm;

    case "dot": // 05.18 (LostItem)
      return `${mm}.${dd}`;

    case "detail": // 2026.05.11 18:00 (NoticePage)
      return `${yyyy}.${mm}.${dd} ${hhmm}`;

    case "notice": // 05/11 18:00 (NoticeDetailPage)
      return `${mm}/${dd} ${hhmm}`;

    case "date": // 2026.05.11 (날짜만)
      return datePart.replace(/-/g, ".");

    default:
      return dateStr;
  }
};
