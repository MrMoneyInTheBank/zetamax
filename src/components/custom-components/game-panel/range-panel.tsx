import { Range } from "@/hooks/useQuestion";
import { Timer } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface RangePanelProps {
  setRange: Dispatch<SetStateAction<Range | undefined>>;
}

export const RangePanel = ({ setRange }: RangePanelProps) => {
  return (
    <>
      <Timer className="text-indigo-200" size={30} />
      <input
        type="text"
        className="flex-grow max-w-32 h-9 rounded-lg text-center text-black placeholder-black/50"
        defaultValue="1"
        placeholder="min"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setRange((prev) => {
            if (!prev) {
              const range: Range = { min: val, max: 10 };
              return range;
            } else {
              const updatedRange: Range = { ...prev, min: val };
              return updatedRange;
            }
          });
        }}
      />
      <input
        type="text"
        className="flex-grow max-w-32 h-9 rounded-lg text-center text-black placeholder-black/50"
        placeholder="max"
        defaultValue="10"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setRange((prev) => {
            if (!prev) {
              const range: Range = { min: 1, max: val };
              return range;
            } else {
              const updatedRange: Range = { ...prev, max: val };
              return updatedRange;
            }
          });
        }}
      />
    </>
  );
};
