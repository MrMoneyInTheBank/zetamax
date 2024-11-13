"use client";

import { useState, useCallback } from "react";

export function useGameState() {
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");

  const incrementScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const resetInput = useCallback(() => {
    setUserInput("");
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  return {
    score,
    userInput,
    setUserInput,
    incrementScore,
    resetInput,
    resetScore,
  };
}
