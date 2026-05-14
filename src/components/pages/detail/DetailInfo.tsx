import { FiMapPin, FiClock } from "react-icons/fi";

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
    <div className={hasBorder ? "border-y border-y-text-sub2 py-6" : ""}>
      <div className="bg-[#f8f9fb] rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <FiMapPin size={13} className="text-primary" />
            <span className="text-xs font-semibold text-text-sub">위치</span>
          </div>
          <span className="text-sm break-keep pl-[19px]">{location}</span>
        </div>
        <div className="w-full h-px bg-text-sub2" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <FiClock size={13} className="text-primary" />
            <span className="text-xs font-semibold text-text-sub">운영시간</span>
          </div>
          <div className="flex flex-col gap-1 pl-[19px]">
            {date.map((d, index) => (
              <span key={index} className="text-sm break-keep">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
