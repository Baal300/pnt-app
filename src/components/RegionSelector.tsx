import React from "react";
import type { Region } from "../types";

type RegionSelectorProps = {
  regions: Region[];
  setRegionIndex: React.Dispatch<React.SetStateAction<number>>;
  regionIndex: number;
};

export const RegionSelector = ({
  regions,
  setRegionIndex,
  regionIndex,
}: RegionSelectorProps) => {
  const handleRegionSelect = (region: Region) => {
    setRegionIndex(regions.indexOf(region));
  };

  return (
    <ul className="menu my-4 w-full max-w-xs">
      {regions.map((region, index) => (
        <li key={region.name}>
          <button
            className={`w-full rounded-none border p-2 font-bold hover:cursor-pointer ${
              index === regionIndex
                ? "bg-green-700 text-white dark:bg-green-500" // Selected state
                : "bg-green-500 hover:bg-green-400 active:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 dark:active:bg-green-700" // Normal state
            } ${index === 0 ? "rounded-t-xl" : ""} ${
              index === regions.length - 1 ? "rounded-b-xl" : ""
            }`}
            onClick={handleRegionSelect.bind(null, region)}
          >
            {region.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
