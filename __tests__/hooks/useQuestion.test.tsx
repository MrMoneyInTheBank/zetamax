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
});
