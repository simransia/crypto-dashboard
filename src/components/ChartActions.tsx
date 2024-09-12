import React from "react";
import { TIME_RANGES } from "../constants/timeRanges";
import { Maximize2, Minimize2, CirclePlus } from "lucide-react";

type Props = {
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
  selectedRange: string;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChartActions = ({
  setSelectedRange,
  selectedRange,
  expand,
  setExpand,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row py-4 px-6 w-full max-w-full text-[#6F7177] items-center justify-between">
      <div className="flex text-sm gap-4 w-1/3">
        <div
          className="flex gap-1 items-center cursor-pointer hover:text-black"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <Minimize2 size={18} />
          ) : (
            <Maximize2 className="text-sm" size={18} />
          )}
          <span>{expand ? "Minimize" : "Fullscreen"}</span>
        </div>
        <div className="flex gap-1 items-center">
          <CirclePlus className="text-sm" size={18} />
          <span className="">Compare</span>
        </div>
      </div>

      <div className="flex w-2/3 justify-end gap-3">
        {Object.keys(TIME_RANGES).map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`px-2 py-1 rounded-md ${
              selectedRange === range ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartActions;
