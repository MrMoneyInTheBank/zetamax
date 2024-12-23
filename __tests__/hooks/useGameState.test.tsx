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

  it("should reset the score to 0 when resetScore is called", () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.incrementScore();
      result.current.incrementScore();
    });

    expect(result.current.score).toBe(2);

    act(() => {
      result.current.resetScore();
    });

    expect(result.current.score).toBe(0);
  });

  it("should update userInput when setUserInput is called", () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.setUserInput("test input");
    });

    expect(result.current.userInput).toBe("test input");

    act(() => {
      result.current.setUserInput("new input");
    });

    expect(result.current.userInput).toBe("new input");
  });

  it("should reset userInput to an empty string when resetInput is called", () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.setUserInput("test input");
    });

    expect(result.current.userInput).toBe("test input");

    act(() => {
      result.current.resetInput();
    });

    expect(result.current.userInput).toBe("");
  });
});
