import { FiMapPin, FiClock } from "react-icons/fi";

type LocationGroup = {
  location: string;
  locationId?: string;
  dates: string[];
};

type Props = {
  location?: string;
  date?: string[];
  locationGroups?: LocationGroup[];
  hasBorder?: boolean;
  hideLocation?: boolean;
};

export default function DetailInfo({
  location,
  date,
  locationGroups,
  hasBorder = true,
  hideLocation = false,
}: Props) {
  const groups: LocationGroup[] =
    locationGroups ??
    (location !== undefined ? [{ location, dates: date ?? [] }] : []);

  return (
    <div className={hasBorder ? "border-y border-y-text-sub2 py-6" : ""}>
      <div className="bg-[#f8f9fb] rounded-2xl p-4 flex flex-col gap-4">
        {groups.map((group, i) => (
          <div key={i} className="flex flex-col gap-4">
            {i > 0 && <div className="w-full h-px bg-text-sub2" />}

            {!hideLocation && (
              <>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <FiMapPin size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-text-sub">
                      위치
                    </span>
                  </div>
                  <span className="text-sm break-keep pl-[19px]">
                    {group.location}
                    {group.locationId ? ` #${group.locationId}` : ""}
                  </span>
                </div>
                <div className="w-full h-px bg-text-sub2" />
              </>
            )}

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <FiClock size={13} className="text-primary" />
                <span className="text-xs font-semibold text-text-sub">
                  운영시간
                </span>
              </div>
              <div className="flex flex-col gap-1 pl-[19px]">
                {group.dates.map((d, index) => (
                  <span key={index} className="text-sm break-keep">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
