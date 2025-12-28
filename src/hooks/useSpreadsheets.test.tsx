import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSpreadsheets } from './useSpreadsheets';
import { STORAGE_KEYS } from '../types/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock alert
vi.stubGlobal('alert', vi.fn());

describe('useSpreadsheets', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('returns empty array initially', () => {
    const { result } = renderHook(() => useSpreadsheets());
    expect(result.current.spreadsheets).toEqual([]);
  });

  it('loads spreadsheets from localStorage', () => {
    const stored = [
      { id: 'abc123', order: 0 },
      { id: 'def456', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SPREADSHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSpreadsheets());
    expect(result.current.spreadsheets).toEqual(stored);
  });

  it('adds new spreadsheet', () => {
    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.add('abc123');
    });

    expect(result.current.spreadsheets).toHaveLength(1);
    expect(result.current.spreadsheets[0]).toEqual({ id: 'abc123', order: 0 });
  });

  it('trims whitespace when adding', () => {
    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.add('  abc123  ');
    });

    expect(result.current.spreadsheets[0].id).toBe('abc123');
  });

  it('prevents adding empty id', () => {
    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.add('');
    });

    expect(result.current.spreadsheets).toHaveLength(0);
  });

  it('prevents adding whitespace-only id', () => {
    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.add('   ');
    });

    expect(result.current.spreadsheets).toHaveLength(0);
  });

  it('prevents adding duplicate id', () => {
    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.add('abc123');
    });

    act(() => {
      result.current.add('abc123');
    });

    expect(result.current.spreadsheets).toHaveLength(1);
    expect(alert).toHaveBeenCalledWith('This spreadsheet ID is already in your list.');
  });

  it('removes spreadsheet and reorders', () => {
    const stored = [
      { id: 'first', order: 0 },
      { id: 'second', order: 1 },
      { id: 'third', order: 2 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SPREADSHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.remove('second');
    });

    expect(result.current.spreadsheets).toHaveLength(2);
    expect(result.current.spreadsheets[0]).toEqual({ id: 'first', order: 0 });
    expect(result.current.spreadsheets[1]).toEqual({ id: 'third', order: 1 });
  });

  it('reorders spreadsheets', () => {
    const stored = [
      { id: 'first', order: 0 },
      { id: 'second', order: 1 },
      { id: 'third', order: 2 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SPREADSHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSpreadsheets());

    act(() => {
      result.current.reorder([
        { id: 'third', order: 2 },
        { id: 'first', order: 0 },
        { id: 'second', order: 1 },
      ]);
    });

    expect(result.current.spreadsheets[0].id).toBe('third');
    expect(result.current.spreadsheets[1].id).toBe('first');
    expect(result.current.spreadsheets[2].id).toBe('second');
  });

  it('returns sorted spreadsheets by order', () => {
    const stored = [
      { id: 'c', order: 2 },
      { id: 'a', order: 0 },
      { id: 'b', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SPREADSHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSpreadsheets());

    expect(result.current.spreadsheets[0].id).toBe('a');
    expect(result.current.spreadsheets[1].id).toBe('b');
    expect(result.current.spreadsheets[2].id).toBe('c');
  });
});
