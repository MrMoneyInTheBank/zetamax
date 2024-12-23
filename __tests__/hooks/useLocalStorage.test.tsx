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

  it("should initialize with the value from localStorage if it exists", () => {
    localStorage.setItem(mockKey, JSON.stringify("storedValue"));

    const { result } = renderHook(() =>
      useLocalStorage(mockKey, "initialValue"),
    );

    const [storedValue] = result.current;
    expect(storedValue).toBe("storedValue");
  });

  it("should update the value and localStorage when setValue is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage(mockKey, "initialValue"),
    );

    const [, setValue] = result.current;

    act(() => {
      setValue("newValue");
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe("newValue");
    expect(localStorage.getItem(mockKey)).toBe(JSON.stringify("newValue"));
  });

  it("should handle functional updates correctly", () => {
    const { result } = renderHook(() => useLocalStorage(mockKey, 0));

    const [, setValue] = result.current;

    act(() => {
      setValue((prev) => prev + 1);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(1);
    expect(localStorage.getItem(mockKey)).toBe(JSON.stringify(1));
  });

});
