import { Range } from "@/hooks/useQuestion";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

interface RangePanelProps {
  setRange: Dispatch<SetStateAction<Range | undefined>>;
}

const inputButtonStyles = `
        flex-grow max-w-20 h-9 rounded-lg text-center text-white 
        font-medium placeholder-white/60 bg-gradient-to-r from-indigo-600 to-purple-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-300
  `;

export const RangePanel = ({ setRange }: RangePanelProps) => {
  return (
    <>
      <motion.input
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 0.3 }}
        type="text"
        className={`${inputButtonStyles}`}
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
      <motion.span
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-2xl w-20 font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent"
      >
        To
      </motion.span>
      <motion.input
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        type="text"
        className={`${inputButtonStyles}`}
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
