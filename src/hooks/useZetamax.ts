"use client";

import { useCallback } from "react";
import { useGameState } from "./useGameState";
import { Range, useQuestion } from "./useQuestion";
import { useTimer } from "./useTimer";
import { MathSymbol } from "@/components/custom-components/game-panel/symbols-panel";

export function useZetamax(
  gameDuration: number,
  customOps?: MathSymbol[],
  range?: Range,
) {
  const timer = useTimer(gameDuration);
  const questionState = useQuestion(customOps, range);
  const gameState = useGameState();

  const handleInput = useCallback(
    (value: string) => {
      gameState.setUserInput(value);

      if (parseInt(value) === questionState.question.answer) {
        gameState.incrementScore();
        questionState.nextQuestion();
        gameState.resetInput();
      }
    },
    [questionState, gameState],
  );

  const restart = useCallback(() => {
    timer.reset();
    gameState.resetScore();
    gameState.resetInput();
    questionState.nextQuestion();
  }, [timer, gameState, questionState, gameDuration]);

  return {
    start: timer.start,
    timeLeft: timer.timeLeft,
    isRunning: timer.isRunning,
    score: gameState.score,
    userInput: gameState.userInput,
    question: questionState.question,
    handleInput,
    restart,
  };
}
