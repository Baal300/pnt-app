import React from "react";

type Regions = {
  name: string;
  start: number;
  end: number;
}[];

type RegionSelectorProps = {
  regions: Regions;
  setRegionIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const RegionSelector = ({
  regions,
  setRegionIndex,
}: RegionSelectorProps) => {
  return (
    <ul className="mt-4 mb-2 w-full max-w-xs rounded border bg-white shadow">
      {regions.map((region) => (
        <li key={region.name}>
          <button
            className="w-full border bg-green-500 p-2 font-bold hover:cursor-pointer hover:bg-green-400 active:bg-green-300"
            onClick={() => setRegionIndex(regions.indexOf(region))}
          >
            {region.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
