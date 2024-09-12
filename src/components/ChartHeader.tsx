import React from "react";
import { TIME_RANGES } from "../constants/timeRanges";
import { Maximize2, Minimize2 } from "lucide-react";

type Props = {
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
  selectedRange: string;
};

const ChartHeader = ({ setSelectedRange, selectedRange }: Props) => {
  return (
    <div className="flex py-4 text-[#6F7177] items-center justify-between">
      <div className="flex text-sm">
        <div className="flex gap-1">
          <Maximize2 className="text-sm" size={18} />
          <span>Fullscreen</span>
        </div>
        {/* <div className="flex gap-1">
            <Minimize2 size={18} />
            <span>Collapse</span>
          </div> */}
      </div>

      <div className="flex w-1/2 justify-center gap-4">
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

export default ChartHeader;
