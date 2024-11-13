"use client";

import { useState, useEffect, useCallback } from "react";

export function useTimer(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(true);
    setTimeLeft(initialTime);
  }, [initialTime]);

  const setTime = useCallback((time: number) => {
    setIsRunning(false);
    setTimeLeft(time);
  }, []);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTime,
  };
}
