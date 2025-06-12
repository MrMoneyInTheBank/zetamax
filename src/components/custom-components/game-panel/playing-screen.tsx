import { Timer, Medal } from "lucide-react";
import { MathSymbol } from "./symbols-panel";

interface PlayingScreenProps {
  timeLeft: number;
  score: number;
  question: {
    num1: number;
    num2: number;
    operation: MathSymbol;
    answer: number;
  };
  userInput: string;
  handleInput: (value: string) => void;
  restart: () => void;
}

export const PlayingScreen = ({
  timeLeft,
  score,
  question,
  userInput,
  handleInput,
  restart,
}: PlayingScreenProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <Timer className="text-indigo-200" size={20} />
          <span className="text-xl font-mono text-indigo-200">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <Medal className="text-purple-200" size={20} />
          <span className="text-xl font-mono text-purple-200">{score}</span>
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
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            restart();
          }
        }}
        className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-2xl text-center text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 transition-colors"
        placeholder=""
        autoFocus
      />
    </div>
  );
};
