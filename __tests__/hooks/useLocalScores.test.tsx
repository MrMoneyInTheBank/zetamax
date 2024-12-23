import { renderHook } from "@testing-library/react";
import { LocalScoresContext } from "@/contexts/localScoresContext";
import { useLocalScores } from "@/hooks/useLocalScores";

describe("useLocalScores Hook", () => {
  it("should throw an error when used outside LocalScoresProvider", () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalScoresContext.Provider value={undefined}>
        {children}
      </LocalScoresContext.Provider>
    );

    expect(() => {
      renderHook(() => useLocalScores(), { wrapper });
    }).toThrow("useLocalScores must be used within LocalScoresProvider");

    console.error = originalConsoleError;
  });

  it("should return context values when used inside LocalScoresProvider", () => {
    const mockContextValue = {
      localScores: [1, 2, 3],
      setLocalScores: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalScoresContext.Provider value={mockContextValue}>
        {children}
      </LocalScoresContext.Provider>
    );

    const { result } = renderHook(() => useLocalScores(), { wrapper });

    expect(result.current.localScores).toEqual([1, 2, 3]);
    expect(typeof result.current.setLocalScores).toBe("function");
    expect(result.current.setLocalScores).toBe(mockContextValue.setLocalScores);
  });
});
