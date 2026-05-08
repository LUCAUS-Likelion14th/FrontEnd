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
    <div className="grid grid-cols-[2fr_1.5fr_1.5fr] gap-2 w-full">
      {BOOTH_LOCATIONS.map((loc) => {
        const isActive = selectedLocation === loc;

        const Icon = isActive ? BsGeoFill : BsGeo;

        return (
          <button
            key={loc}
            onClick={() => onSelectLocation(isActive ? null : loc)}
            className={`flex items-center justify-center gap-1.5 h-10 rounded-[6px] transition-colors ${
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
