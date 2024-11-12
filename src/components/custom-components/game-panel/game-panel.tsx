"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useZetamax } from "@/hooks/useZetamax";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Timer, Medal, Play } from "lucide-react";
import { addUserScore } from "@/lib/addUserScore";

export const GamePanel = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [played, setPlayed] = useState(false);
  const [duration, setDuration] = useState(120);

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
    } else if (e.target.value === "") {
      setDuration(120);
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
  } = useZetamax(duration);

  const handleClick = () => {
    restart();
    setPlayed(true);
  };

  const handleGameEnd = async () => {
    if (played && !isRunning) {
      const {
        success: saveSuccess,
        message: saveMessage,
        description: saveDescription,
      } = await addUserScore(user?.id, score);

      if (!saveSuccess) {
        toast({
          title: saveMessage,
          description: saveDescription,
          className:
            "bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white",
        });
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
    <section className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
        {!isRunning ? (
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {bannerText}
            </h1>
            <div className="flex items-center space-x-4 text-xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              <span>Duration: </span>
              <input
                type="text"
                className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-2 py-1 text-xl text-center text-white focus:outline-none focus:border-indigo-400 transition-colors"
                placeholder={`${duration} seconds`}
                onChange={handleDurationChange}
              />
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
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Timer className="text-indigo-200" size={20} />
                <span className="text-xl font-mono text-indigo-200">
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Medal className="text-purple-200" size={20} />
                <span className="text-xl font-mono text-purple-200">
                  {score}
                </span>
              </div>
            </div>

            <div className="text-4xl font-bold text-center text-white py-4">
              <span className="mx-2">{question.num1}</span>
              <span className="mx-2 text-indigo-300">{question.operation}</span>
              <span className="mx-2">{question.num2}</span>
            </div>

            <input
              type="text"
              value={userInput}
              onChange={(e) => handleInput(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-2xl text-center text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 transition-colors"
              placeholder=""
              autoFocus
            />
          </div>
        )}
      </div>
    </section>
  );
};
