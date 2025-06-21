"use client";

import { useState, useEffect, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocalScores } from "@/hooks/useLocalScores";
import { useZetamax } from "@/hooks/useZetamax";
import { Play, ChartNoAxesGantt, Timer } from "lucide-react";
import { UserContext } from "@/contexts/userContext";
import { addUserScore } from "@/lib/addUserScore";
import { Range } from "@/hooks/useQuestion";
import { TimePanel } from "./time-panel";
import { ToolTipWrapper } from "../tooltip-wrapper/tooltip-wrapper";
import { PlayingScreen } from "./playing-screen";
import { MathSymbol } from "./symbols-panel";
import { SymbolsPanel } from "./symbols-panel";
import { RangePanel } from "./range-panel";
import { motion } from "motion/react";

export const defaultOps: MathSymbol[] = ["+", "-", "*", "/"];

export const GamePanel = () => {
  const { toast } = useToast();
  const userId = useContext(UserContext);
  const [played, setPlayed] = useState(false);
  const { setLocalScores } = useLocalScores();

  const [duration, setDuration] = useState(120);
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const [ops, setOps] = useState(defaultOps);
  const toggleSymbol = (sym: MathSymbol) => {
    setOps((prev) => {
      const updated = prev.includes(sym)
        ? prev.filter((x) => x != sym)
        : [...prev, sym];
      if (updated.length === 0) {
        return defaultOps;
      }
      return updated;
    });
  };
  const [range, setRange] = useState<Range | undefined>(undefined);
  const [settingRange, setSettingRange] = useState(false);

  const toggleRange = () => {
    if (settingRange) {
      setRange(undefined);
      setSettingRange(false);
    } else {
      setRange({ min: 1, max: 10 });
      setSettingRange(true);
    }
  };

  const {
    timeLeft,
    isRunning,
    score,
    userInput,
    question,
    handleInput,
    restart,
  } = useZetamax(duration, ops, range);

  const handleClick = () => {
    restart();
    setPlayed(true);
  };

  const handleGameEnd = async () => {
    if (played && !isRunning) {
      const scaledScore = Math.round((score / duration) * 120);
      if (range !== undefined || ops.length !== 4) {
        toast({
          title: "Result not saved.",
          description: "Custom game skipped in records.",
          className:
            "bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white",
        });
        return;
      }

      const {
        success: saveSuccess,
        message: saveMessage,
        description: saveDescription,
      } = await addUserScore(userId, scaledScore);

      if (!saveSuccess) {
        toast({
          title: saveMessage,
          description: saveDescription,
          className:
            "bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white",
        });

        setLocalScores((prev) => [...prev, scaledScore]);
      } else {
        toast({
          title: "Previous score saved!",
          description: saveDescription,
          className:
            "bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white",
        });
      }
    }
  };

  useEffect(() => {
    handleGameEnd();
  }, [played, isRunning]);

  const welcomeText = "Play Zetamax";
  const resultText = `Score: ${score}`;
  const bannerText = played ? resultText : welcomeText;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6"
      >
        {!isRunning ? (
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {bannerText}
            </h1>
            <SymbolsPanel ops={ops} toggleSymbol={toggleSymbol} />
            <div className="flex justify-center items-center">
              <ToolTipWrapper text="Set duration">
                <Timer className="text-indigo-200" size={30} />
              </ToolTipWrapper>
              <div className="flex justify-center items-center w-full space-x-4">
                {settingRange ? (
                  <RangePanel setRange={setRange} />
                ) : (
                  <TimePanel
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                  />
                )}
              </div>
              <ToolTipWrapper text="Set custom range">
                <button className="relative" onClick={() => toggleRange()}>
                  <ChartNoAxesGantt
                    className="text-indigo-200 hover:scale-125 transition-transform"
                    size={30}
                  />
                </button>
              </ToolTipWrapper>
            </div>
            <button
              onClick={handleClick}
              className="group relative px-8 py-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold text-lg transition-all hover:from-indigo-600 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900"
            >
              <span className="flex items-center justify-center gap-2">
                <Play size={20} className="group-hover:animate-pulse" />
                {played ? "Play Again" : "Start Game"}
              </span>
            </button>
          </div>
        ) : (
          <PlayingScreen
            timeLeft={timeLeft}
            score={score}
            question={question}
            userInput={userInput}
            handleInput={handleInput}
            restart={restart}
          />
        )}
      </motion.div>
    </section>
  );
};
