import { renderHook, act } from "@testing-library/react";
import { useGameState } from "@/hooks/useGameState";

describe("useGameState Hook", () => {
  it("should initialize score and userInput correctly", () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.score).toBe(0);
    expect(result.current.userInput).toBe("");
  });
});
