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
});
