"use client";

import { defaultOps } from "@/components/custom-components/game-panel/game-panel";
import { useCallback, useState } from "react";
import { MathSymbol } from "@/components/custom-components/game-panel/symbols-panel";

export type Range = {
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
  MathSymbol,
  {
    fn: (x: number, y: number) => number;
    getOperands: (customRange?: Range) => { num1: number; num2: number };
  }
> = {
  "+": {
    fn: (x, y) => x + y,
    getOperands: (customRange?: Range) => {
      return {
        num1: generateNumberInRange(customRange ?? RANGES.addition.operand1),
        num2: generateNumberInRange(customRange ?? RANGES.addition.operand2),
      };
    },
  },
  "-": {
    fn: (x, y) => x - y,
    getOperands: (customRange?: Range) => {
      const num1 = generateNumberInRange(
        customRange ?? RANGES.addition.operand1,
      );
      const num2 = generateNumberInRange(
        customRange ?? RANGES.addition.operand2,
      );
      return { num1: num1 + num2, num2: num2 };
    },
  },
  "*": {
    fn: (x, y) => x * y,
    getOperands: (customRange?: Range) => ({
      num1: generateNumberInRange(
        customRange ?? RANGES.multiplication.operand1,
      ),
      num2: generateNumberInRange(
        customRange ?? RANGES.multiplication.operand2,
      ),
    }),
  },
  "/": {
    fn: (x, y) => x / y,
    getOperands: (customRange?: Range) => {
      const num1 = generateNumberInRange(
        customRange ?? RANGES.multiplication.operand1,
      );
      const num2 = generateNumberInRange(
        customRange ?? RANGES.multiplication.operand2,
      );
      return { num1: num1 * num2, num2: num1 };
    },
  },
};

export function useQuestion(customOps?: MathSymbol[], customRange?: Range) {
  const generateQuestion = useCallback(() => {
    const ops =
      customOps === undefined || customOps.length === 0
        ? defaultOps
        : customOps;
    const operation = ops[Math.floor(Math.random() * ops.length)];
    const { num1, num2 } = OPERATIONS[operation].getOperands(customRange);
    const answer = OPERATIONS[operation].fn(num1, num2);
    return { num1, num2, operation, answer };
  }, [customOps, customRange]);

  const [question, setQuestion] = useState(generateQuestion());

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
  }, [generateQuestion]);

  return { question, nextQuestion };
}
