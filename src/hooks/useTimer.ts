"use client";

import { useState, useEffect, useCallback } from "react";
interface TimerControls {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (time: number) => void;
}

export function useTimer(initialTime: number): TimerControls {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [originalTime] = useState<number>(initialTime);

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
    setIsRunning(false);
    setTimeLeft(originalTime);
  }, [originalTime]);
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
