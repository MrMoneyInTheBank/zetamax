import { renderHook, act } from "@testing-library/react";
import { useTimer } from "@/hooks/useTimer";

jest.useFakeTimers();

describe("useTimer", () => {
  it("should initialize with the given initial time", () => {
    const { result } = renderHook(() => useTimer(10));
    expect(result.current.timeLeft).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });
});
