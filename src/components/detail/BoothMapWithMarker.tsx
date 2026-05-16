"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MAP_SRC: Record<string, string> = {
  "서라벌홀 일대": "/maps/Seorabeol.svg",
  "대운동장": "/maps/playground.svg",
  "후문 일대": "/maps/backdoor.svg",
};

const MAP_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "서라벌홀 일대": { width: 389, height: 259 },
  "대운동장": { width: 389, height: 259 },
  "후문 일대": { width: 776, height: 259 },
};

// [x%, y%] — percentage position of each booth's center within the SVG viewBox
const BOOTH_COORDS: Record<string, [number, number]> = {
  // 서라벌홀 일대 (1–16)
  "1":  [90.6, 26.9], "2":  [83.2, 26.9], "3":  [75.8, 26.9], "4":  [68.4, 26.9],
  "5":  [61.0, 26.9], "6":  [53.6, 26.9], "7":  [46.2, 26.9], "8":  [38.8, 26.9],
  "9":  [31.4, 26.9], "10": [24.0, 26.9], "11": [16.6, 26.9], "12": [ 9.2, 26.9],
  "13": [58.1, 61.6], "14": [50.7, 61.6], "15": [12.1, 61.6], "16": [12.1, 72.7],
  // 대운동장 (17–34)
  "17": [93.9, 56.5], "18": [87.8, 56.5], "19": [81.6, 56.5], "20": [75.4, 56.5],
  "21": [69.3, 56.5], "22": [63.1, 56.5], "23": [56.9, 56.5], "24": [50.7, 56.5],
  "25": [44.1, 63.1], "26": [44.1, 72.4], "27": [44.1, 81.6], "28": [44.1, 90.9],
  "29": [37.9, 90.9], "30": [31.7, 90.9],
  "31": [25.3, 38.8], "32": [19.1, 38.8], "33": [13.0, 38.8], "34": [ 6.8, 38.8],
  // 후문 일대 (35–74)
  "35": [95.9, 69.7], "36": [93.1, 69.7], "37": [89.7, 69.7], "38": [86.9, 69.7],
  "39": [84.1, 69.7], "40": [81.2, 69.7], "41": [78.4, 69.7], "42": [75.6, 69.7],
  "43": [70.5, 69.7], "44": [67.7, 69.7], "45": [64.9, 69.7], "46": [62.0, 69.7],
  "47": [59.2, 69.7], "48": [56.4, 69.7],
  "49": [52.4, 62.7], "50": [49.5, 62.7], "51": [46.2, 62.7], "52": [43.4, 62.7],
  "53": [82.6, 36.2], "54": [79.1, 36.2], "55": [75.7, 36.2], "56": [72.2, 36.2],
  "57": [68.8, 36.2], "58": [65.3, 36.2], "59": [61.9, 36.2], "60": [58.4, 36.2],
  "61": [55.0, 36.2], "62": [51.5, 36.2], "63": [46.1, 36.2], "64": [42.6, 36.2],
  "65": [39.2, 36.2], "66": [35.7, 36.2], "67": [32.3, 36.2], "68": [28.8, 36.2],
  "69": [21.3, 36.2], "70": [17.9, 36.2], "71": [14.4, 36.2], "72": [11.0, 36.2],
  "73": [ 7.5, 36.2], "74": [ 4.1, 36.2],
};

type Props = {
  location: string;
  locationId: string;
};

function resolveCoordsList(locationId: string): [number, number][] {
  if (BOOTH_COORDS[locationId]) return [BOOTH_COORDS[locationId]];
  return locationId
    .split("-")
    .map((p) => BOOTH_COORDS[p.trim()])
    .filter(Boolean) as [number, number][];
}

function PinMarker({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ y: -24, opacity: 0, scale: 0.4 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 14, delay }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }}
      >
        <svg width="24" height="30" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C11.3458 6.25195e-05 12.6528 0.259657 13.8838 0.774414C15.067 1.26506 16.1458 1.98134 17.0605 2.88281L17.3936 3.22559C18.1514 4.04459 18.766 4.98993 19.209 6.01953C19.7332 7.23934 19.9989 8.53579 19.999 9.86914C19.999 11.7802 19.5465 13.6766 18.6533 15.502C17.9396 16.9706 16.9433 18.4014 15.6914 19.7549C13.554 22.068 11.314 23.4821 10.6748 23.8623L10.6738 23.8613C10.5171 23.9551 10.3472 24.0131 10.1729 24.0361L9.99707 24.0479C9.75879 24.0482 9.52436 23.9843 9.31934 23.8623C8.67959 23.4817 6.43873 22.0676 4.30176 19.7549C3.05008 18.3989 2.05452 16.9697 1.34082 15.501C0.453303 13.6735 7.23137e-05 11.7752 0 9.86719C6.18989e-05 8.53367 0.265686 7.23656 0.790039 6.0166L0.991211 5.58105C1.48289 4.57689 2.1407 3.66267 2.93848 2.87988C3.85748 1.97776 4.92552 1.2674 6.11621 0.771484C7.34705 0.259477 8.6542 5.44223e-05 10 0ZM10.8965 5.12695C10.6458 4.3564 9.55525 4.35628 9.30469 5.12695L8.83301 6.58105C8.72098 6.92572 8.39952 7.15908 8.03711 7.15918H6.50879C5.69816 7.15918 5.36081 8.19636 6.0166 8.67285L7.25293 9.57129C7.54622 9.78438 7.66867 10.1621 7.55664 10.5068L7.08496 11.9609C6.83494 12.7315 7.71641 13.3722 8.37207 12.8965L9.60938 11.998C9.90266 11.785 10.2995 11.785 10.5928 11.998L11.8291 12.8965C12.4848 13.3727 13.3672 12.7317 13.1172 11.9609L12.6445 10.5068C12.5326 10.1622 12.6552 9.7844 12.9482 9.57129L14.1855 8.67285C14.841 8.19629 14.5039 7.1592 13.6934 7.15918H12.165C11.8026 7.15918 11.4812 6.92573 11.3691 6.58105L10.8965 5.12695Z" fill="#EA3F89"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function BoothMapWithMarker({ location, locationId }: Props) {
  const src = MAP_SRC[location];
  const dim = MAP_DIMENSIONS[location];
  const coordsList = resolveCoordsList(locationId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isWide = dim.width > 500;

  useEffect(() => {
    if (!isWide || !scrollRef.current || coordsList.length === 0) return;
    const avgX = coordsList.reduce((s, c) => s + c[0], 0) / coordsList.length;
    const markerPx = (avgX / 100) * dim.width;
    scrollRef.current.scrollLeft = markerPx - scrollRef.current.offsetWidth / 2;
  }, [coordsList, dim.width, isWide]);

  if (!src || !dim) return null;

  return (
    <div
      ref={scrollRef}
      className={`relative rounded-lg overflow-hidden ${isWide ? "overflow-x-auto scrollbar-hide" : "w-full"}`}
    >
      <div className="relative" style={{ width: isWide ? dim.width : "100%" }}>
        <Image
          src={src}
          alt={`${location} 지도`}
          width={dim.width}
          height={dim.height}
          className={isWide ? "block" : "w-full h-auto block"}
        />
        {coordsList.map((coords, i) => (
          <div
            key={i}
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${coords[0]}%`,
              top: `${coords[1]}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <PinMarker delay={i * 0.15} />
          </div>
        ))}
      </div>
    </div>
  );
}
