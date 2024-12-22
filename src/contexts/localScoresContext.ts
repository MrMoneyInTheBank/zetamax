"use client";

import { createContext } from "react";

interface LocalScoresContextType {
  localScores: number[];
  setLocalScores: (value: number[] | ((prev: number[]) => number[])) => void;
}

export const LocalScoresContext = createContext<
  LocalScoresContextType | undefined
>(undefined);
