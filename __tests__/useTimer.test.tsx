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

  it("should pause the timer", () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(3);
  });

  it("should reset the timer", () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(5);
    expect(result.current.isRunning).toBe(true);
  });

  it("should set a new time and stop the timer", () => {
    const { result } = renderHook(() => useTimer(5));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.setTime(8);
    });

    expect(result.current.timeLeft).toBe(8);
    expect(result.current.isRunning).toBe(false);
  });
});
