"use client";

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

type CategoryProps = {
  categories: CategoryType[];
  selected: CategoryType;
  onSelect: (value: CategoryType) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function Category({
  categories,
  selected,
  onSelect,
  selectedDate,
  onSelectDate,
}: CategoryProps) {
  return (
    <div>
      <section className="relative mb-4">
        <div className="flex mx-[57.5px] justify-between">
          <button
            onClick={() => onSelectDate("2026-05-21")}
            className={`pb-2 ${
              selectedDate === "2026-05-21"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            5월 21일
          </button>

          <button
            onClick={() => onSelectDate("2026-05-22")}
            className={`pb-2 ${
              selectedDate === "2026-05-22"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            5월 22일
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

      <section className="flex gap-2.5">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`p-2.5 rounded-md text-base leading-4.5 ${
              selected === item
                ? "bg-primary text-white"
                : "bg-[#DADADA] text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </section>
    </div>
  );
}
