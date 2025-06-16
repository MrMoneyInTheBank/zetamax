import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface TimePanelProps {
  duration: number;
  handleDurationChange: (newDuration: number) => void;
}

export const TimePanel = ({
  duration,
  handleDurationChange,
}: TimePanelProps) => {
  return (
    <>
      <motion.span
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, duration: 0.3 }}
      >
        <Button
          variant={duration === 30 ? "default" : "outline"}
          onClick={() => handleDurationChange(30)}
          className={`w-20 ${duration === 30 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
        >
          30s
        </Button>
      </motion.span>

      <motion.span
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Button
          variant={duration === 60 ? "default" : "outline"}
          onClick={() => handleDurationChange(60)}
          className={`w-20 ${duration === 60 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
        >
          60s
        </Button>
      </motion.span>

      <motion.span
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Button
          variant={duration === 120 ? "default" : "outline"}
          onClick={() => handleDurationChange(120)}
          className={`w-20 ${duration === 120 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
        >
          120s
        </Button>
      </motion.span>
    </>
  );
};
