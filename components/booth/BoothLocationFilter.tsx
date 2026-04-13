"use client";

import { BsGeoFill } from "react-icons/bs";
import { BsGeo } from "react-icons/bs";
import { BOOTH_LOCATIONS, BoothLocation } from "@/data/boothData";

type Props = {
  selectedLocation: BoothLocation | null;
  onSelectLocation: (location: BoothLocation | null) => void;
};

export default function BoothLocationFilter({
  selectedLocation,
  onSelectLocation,
}: Props) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {BOOTH_LOCATIONS.map((loc) => {
        const isActive = selectedLocation === loc;

        const Icon = isActive ? BsGeoFill : BsGeo;

        return (
          <button
            key={loc}
            onClick={() => onSelectLocation(isActive ? null : loc)}
            className={`flex items-center gap-2 px-2.5 h-10 rounded-[6px] transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "border border-text-sub text-text-sub"
            }`}
          >
            <Icon size={20} />
            <span className="text-base whitespace-nowrap">{loc}</span>
          </button>
        );
      })}
    </div>
  );
}
