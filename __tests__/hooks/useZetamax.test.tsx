import { renderHook, act } from "@testing-library/react";
import { useZetamax } from "@/hooks/useZetamax";
import { useGameState } from "@/hooks/useGameState";
import { useQuestion } from "@/hooks/useQuestion";
import { useTimer } from "@/hooks/useTimer";

jest.mock("@/hooks/useGameState");
jest.mock("@/hooks/useQuestion");
jest.mock("@/hooks/useTimer");

describe("useZetamax", () => {
  const mockGameState = {
    score: 0,
    userInput: "",
    setUserInput: jest.fn(),
    incrementScore: jest.fn(),
    resetInput: jest.fn(),
    resetScore: jest.fn(),
  };

  const mockQuestionState = {
    question: { text: "What is 2 + 2?", answer: 4 },
    nextQuestion: jest.fn(),
  };

  const mockTimer = {
    start: jest.fn(),
    timeLeft: 60,
    isRunning: false,
    reset: jest.fn(),
  };

  beforeEach(() => {
    (useGameState as jest.Mock).mockReturnValue(mockGameState);
    (useQuestion as jest.Mock).mockReturnValue(mockQuestionState);
    (useTimer as jest.Mock).mockReturnValue(mockTimer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize correctly with timer, game state, and question state", () => {
    const { result } = renderHook(() => useZetamax(60));

    expect(result.current.start).toBe(mockTimer.start);
    expect(result.current.timeLeft).toBe(mockTimer.timeLeft);
    expect(result.current.isRunning).toBe(mockTimer.isRunning);
    expect(result.current.score).toBe(mockGameState.score);
    expect(result.current.userInput).toBe(mockGameState.userInput);
    expect(result.current.question).toBe(mockQuestionState.question);
  });
});
