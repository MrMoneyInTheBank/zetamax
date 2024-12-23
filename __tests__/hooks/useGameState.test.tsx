import { renderHook, act } from "@testing-library/react";
import { useGameState } from "@/hooks/useGameState";

describe("useGameState Hook", () => {
  it("should initialize score and userInput correctly", () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.score).toBe(0);
    expect(result.current.userInput).toBe("");
  });

  it("should increment the score when incrementScore is called", () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.incrementScore();
    });

    expect(result.current.score).toBe(1);

    act(() => {
      result.current.incrementScore();
    });

    expect(result.current.score).toBe(2);
  });
});
