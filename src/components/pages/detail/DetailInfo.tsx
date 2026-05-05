type Props = {
  location: string;
  date: string[];
  hasBorder?: boolean;
};

export default function DetailInfo({
  location,
  date,
  hasBorder = true,
}: Props) {
  return (
    <div
      className={`flex gap-13 text-base ${hasBorder ? "border-y border-y-text-sub2 py-6" : ""}`}
    >
      <div className="flex flex-col gap-5 text-text-sub font-semibold shrink-0">
        <span>위치</span>
        <span>운영시간</span>
      </div>
      <div className="flex flex-col gap-5">
        <span>{location}</span>
        <div className="flex flex-col gap-2">
          {date.map((d, index) => (
            <span key={index}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
