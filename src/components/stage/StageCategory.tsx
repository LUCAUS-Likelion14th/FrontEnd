"use client";

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

type CategoryProps = {
  categories: CategoryType[];
  selected: CategoryType;
  onSelect: (value: CategoryType) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function StageCategory({
  categories,
  selected,
  onSelect,
  selectedDate,
  onSelectDate,
}: CategoryProps) {
  return (
    <div>
      {/* 날짜 선택 탭 */}
      <section className="relative mb-3.5">
        <div className="flex pb-2">
          <button
            onClick={() => onSelectDate("2026-05-21")}
            className={`w-1/2 text-center transition-opacity active:opacity-50 ${
              selectedDate === "2026-05-21"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            21일 목
          </button>

          <button
            onClick={() => onSelectDate("2026-05-22")}
            className={`w-1/2 text-center transition-opacity active:opacity-50 ${
              selectedDate === "2026-05-22"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            22일 금
          </button>
        </div>

        <div className="absolute bottom-0 w-full h-0.5 bg-text-sub2" />
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={{
            width: "50%",
            left: selectedDate === "2026-05-21" ? "0%" : "50%",
          }}
        />
      </section>

      {/* 공연 카테고리 선택 */}
      <section className="flex gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`flex-1 py-2 rounded-md text-sm font-medium leading-4.5 transition-all active:scale-95 ${
              selected === item
                ? "bg-primary text-white active:opacity-80"
                : "bg-primary-light text-text-sub"
            }`}
          >
            {item}
          </button>
        ))}
      </section>
    </div>
  );
}
