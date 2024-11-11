"use client";
import { useCallback, useState } from "react";

const OPERATIONS: Record<string, (x: number, y: number) => number> = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => {
    if (y === 0) {
      throw new Error("Division by zero");
    }
    return x / y;
  },
};

export function useQuestion() {
  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 99) + 1;
    const num2 = Math.floor(Math.random() * 99) + 1;
    const ops = ["+", "-", "*", "/"];
    const operation = ops[Math.floor(Math.random() * ops.length)];

    const answer = OPERATIONS[operation](num1, num2);
    return { num1, num2, operation, answer };
  }, []);

  const [question, setQuestion] = useState(generateQuestion());

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
  }, [generateQuestion]);

  return { question, nextQuestion };
}
