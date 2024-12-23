import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const mockKey = "testKey";
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with the initial value if localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage(mockKey, "initialValue"),
    );

    const [storedValue] = result.current;
    expect(storedValue).toBe("initialValue");
  });
});
