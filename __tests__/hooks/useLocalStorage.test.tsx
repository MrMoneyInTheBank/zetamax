import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const mockKey = "testKey";
  let consoleSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]],
    any
  >;

  beforeEach(() => {
    localStorage.clear();
    consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
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

  it("should log a warning if reading from localStorage throws an error", () => {
    const mockGetItem = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("Error reading localStorage");
      });

    renderHook(() => useLocalStorage(mockKey, "initialValue"));

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error reading localStorage key "${mockKey}"`),
      expect.any(Error),
    );

    mockGetItem.mockRestore();
  });

  it("should log a warning if writing to localStorage throws an error", () => {
    const mockSetItem = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Error writing to localStorage");
      });

    const { result } = renderHook(() =>
      useLocalStorage(mockKey, "initialValue"),
    );
    const [, setItem] = result.current;

    act(() => {
      setItem("newValue");
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error setting localStorage key "${mockKey}"`),
      expect.any(Error),
    );

    mockSetItem.mockRestore();
  });
});
