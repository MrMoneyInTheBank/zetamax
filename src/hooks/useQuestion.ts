"use client";

import { useCallback, useState } from "react";

type Range = {
  min: number;
  max: number;
};

const RANGES = {
  addition: { operand1: { min: 2, max: 100 }, operand2: { min: 2, max: 100 } },
  multiplication: {
    operand1: { min: 2, max: 12 },
    operand2: { min: 2, max: 100 },
  },
};

const generateNumberInRange = (range: Range) =>
  Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

const OPERATIONS: Record<
  string,
  {
    fn: (x: number, y: number) => number;
    getOperands: () => { num1: number; num2: number };
  }
> = {
  "+": {
    fn: (x, y) => x + y,
    getOperands: () => ({
      num1: generateNumberInRange(RANGES.addition.operand1),
      num2: generateNumberInRange(RANGES.addition.operand2),
    }),
  },
  "-": {
    fn: (x, y) => x - y,
    getOperands: () => {
      const num1 = generateNumberInRange(RANGES.addition.operand1);
      const num2 = generateNumberInRange(RANGES.addition.operand2);
      return { num1: num1 + num2, num2: num2 };
    },
  },
  "*": {
    fn: (x, y) => x * y,
    getOperands: () => ({
      num1: generateNumberInRange(RANGES.multiplication.operand1),
      num2: generateNumberInRange(RANGES.multiplication.operand2),
    }),
  },
  "/": {
    fn: (x, y) => x / y,
    getOperands: () => {
      const num1 = generateNumberInRange(RANGES.multiplication.operand1);
      const num2 = generateNumberInRange(RANGES.multiplication.operand2);
      return { num1: num1 * num2, num2: num1 };
    },
  },
};

export function useQuestion() {
  const generateQuestion = useCallback(() => {
    const ops = ["+", "-", "*", "/"];
    const operation = ops[Math.floor(Math.random() * ops.length)];
    const { num1, num2 } = OPERATIONS[operation].getOperands();
    const answer = OPERATIONS[operation].fn(num1, num2);
    return { num1, num2, operation, answer };
  }, []);

  const [question, setQuestion] = useState(generateQuestion());

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
  }, [generateQuestion]);

  return { question, nextQuestion };
}
