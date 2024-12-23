import { renderHook, act } from "@testing-library/react";
import { useQuestion } from "@/hooks/useQuestion";

describe("useQuestion Hook", () => {
  it("should generate an initial question correctly", () => {
    const { result } = renderHook(() => useQuestion());

    const { question } = result.current;

    expect(question).toHaveProperty("num1");
    expect(question).toHaveProperty("num2");
    expect(question).toHaveProperty("operation");
    expect(question).toHaveProperty("answer");

    const { num1, num2, operation, answer } = question;

    // Validate the operation rules
    switch (operation) {
      case "+":
        expect(answer).toBe(num1 + num2);
        break;
      case "-":
        expect(answer).toBe(num1 - num2);
        break;
      case "*":
        expect(answer).toBe(num1 * num2);
        break;
      case "/":
        expect(answer).toBe(num1 / num2);
        break;
      default:
        throw new Error(`Unexpected operation: ${operation}`);
    }
  });

  it("should update the question when nextQuestion is called", () => {
    const { result } = renderHook(() => useQuestion());

    const initialQuestion = result.current.question;

    act(() => {
      result.current.nextQuestion();
    });

    const updatedQuestion = result.current.question;

    // Ensure the question was updated
    expect(updatedQuestion).not.toEqual(initialQuestion);
    expect(updatedQuestion).toHaveProperty("num1");
    expect(updatedQuestion).toHaveProperty("num2");
    expect(updatedQuestion).toHaveProperty("operation");
    expect(updatedQuestion).toHaveProperty("answer");
  });

  it("should always generate valid operations and answers", () => {
    const { result } = renderHook(() => useQuestion());

    for (let i = 0; i < 100; i++) {
      act(() => {
        result.current.nextQuestion();
      });

      const { num1, num2, operation, answer } = result.current.question;

      switch (operation) {
        case "+":
          expect(answer).toBe(num1 + num2);
          break;
        case "-":
          expect(answer).toBe(num1 - num2);
          break;
        case "*":
          expect(answer).toBe(num1 * num2);
          break;
        case "/":
          expect(answer).toBe(num1 / num2);
          break;
        default:
          throw new Error(`Unexpected operation: ${operation}`);
      }
    }
  });
});
