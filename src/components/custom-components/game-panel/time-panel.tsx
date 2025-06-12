import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { ToolTipWrapper } from "../tooltip-wrapper/tooltip-wrapper";

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
      <ToolTipWrapper text="Set duration">
        <Timer className="text-indigo-200" size={30} />
      </ToolTipWrapper>
      <Button
        variant={duration === 30 ? "default" : "outline"}
        onClick={() => handleDurationChange(30)}
        className={`w-20 ${duration === 30 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
      >
        30s
      </Button>
      <Button
        variant={duration === 60 ? "default" : "outline"}
        onClick={() => handleDurationChange(60)}
        className={`w-20 ${duration === 60 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
      >
        60s
      </Button>
      <Button
        variant={duration === 120 ? "default" : "outline"}
        onClick={() => handleDurationChange(120)}
        className={`w-20 ${duration === 120 ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-zinc-300"} border-none transition-transform hover:scale-110`}
      >
        120s
      </Button>
    </>
  );
};
