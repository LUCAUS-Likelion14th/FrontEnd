"use client";

type CategoryProps = {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function Category({
  categories,
  selected,
  onSelect,
}: CategoryProps) {
  return (
    <div>
      <div>날짜</div>
      <div className="flex gap-2.5">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`p-2.5 rounded-md text-base leading-4.5 ${
              selected === item
                ? "bg-[#05F] text-white"
                : "bg-[#DADADA] text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
