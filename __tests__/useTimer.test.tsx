import { renderHook, act } from "@testing-library/react";
import { useTimer } from "@/hooks/useTimer";

jest.useFakeTimers();

describe("useTimer", () => {
  it("should initialize with the given initial time", () => {
    const { result } = renderHook(() => useTimer(10));
    expect(result.current.timeLeft).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it("should start the timer and decrement time", () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timeLeft).toBe(2);
  });
});
