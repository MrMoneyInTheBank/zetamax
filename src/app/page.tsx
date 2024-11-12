"use client";

import { useState } from "react";
import { useZetamax } from "@/hooks/useZetamax";
import ClerkPortal from "@/components/clerk-components/user-profile/user-profile";

export default function Home() {
  const {
    timeLeft,
    isRunning,
    score,
    userInput,
    question,
    handleInput,
    restart,
  } = useZetamax(10);
  const [played, setPlayed] = useState(false);

  const handleClick = () => {
    restart();
    setPlayed(true);
  };

  const welcomeText = "Play Zetamax";
  const resultText = `Game Over! Score: ${score}`;
  const bannerText = played ? resultText : welcomeText;

  return (
    <>
      <ClerkPortal />

      {!isRunning ? (
        <div>
          <div>{bannerText}</div>
          <button className="bg-white text-black" onClick={handleClick}>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div>
            Time: {timeLeft} Score: {score}
          </div>
          <div>
            {question.num1} {question.operation} {question.num2}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInput(e.target.value)}
            className="border p-1"
          />
        </div>
      )}
    </>
  );
}
