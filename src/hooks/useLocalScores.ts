"use client";

import { LocalScoresContext } from "@/contexts/localScoresContext";
import { useContext } from "react";

export function useLocalScores() {
  const context = useContext(LocalScoresContext);

  if (!context) {
    throw new Error("useLocalScores must be used within LocalScoresProvider");
  }

  return context;
}
