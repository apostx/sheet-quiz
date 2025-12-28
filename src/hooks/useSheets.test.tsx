import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSheets } from './useSheets';
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

describe('useSheets', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('returns empty array initially', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));
    expect(result.current.sheets).toEqual([]);
  });

  it('filters sheets by spreadsheetId', () => {
    const stored = [
      { spreadsheetId: 'spreadsheet1', name: 'Sheet1', order: 0 },
      { spreadsheetId: 'spreadsheet2', name: 'Sheet2', order: 0 },
      { spreadsheetId: 'spreadsheet1', name: 'Sheet3', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSheets('spreadsheet1'));

    expect(result.current.sheets).toHaveLength(2);
    expect(result.current.sheets[0].name).toBe('Sheet1');
    expect(result.current.sheets[1].name).toBe('Sheet3');
  });

  it('adds new sheet', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('Sheet1');
    });

    expect(result.current.sheets).toHaveLength(1);
    expect(result.current.sheets[0]).toEqual({
      spreadsheetId: 'spreadsheet1',
      name: 'Sheet1',
      order: 0,
    });
  });

  it('trims whitespace when adding', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('  Sheet1  ');
    });

    expect(result.current.sheets[0].name).toBe('Sheet1');
  });

  it('prevents adding empty name', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('');
    });

    expect(result.current.sheets).toHaveLength(0);
  });

  it('prevents adding duplicate name for same spreadsheet', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('Sheet1');
    });

    act(() => {
      result.current.add('Sheet1');
    });

    expect(result.current.sheets).toHaveLength(1);
    expect(alert).toHaveBeenCalledWith('This sheet name is already in your list for this spreadsheet.');
  });

  it('allows same name for different spreadsheets', () => {
    const stored = [{ spreadsheetId: 'spreadsheet1', name: 'Sheet1', order: 0 }];
    localStorageMock.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSheets('spreadsheet2'));

    act(() => {
      result.current.add('Sheet1');
    });

    expect(result.current.sheets).toHaveLength(1);
    expect(alert).not.toHaveBeenCalled();
  });

  it('removes sheet and preserves other spreadsheet sheets', () => {
    const stored = [
      { spreadsheetId: 'spreadsheet1', name: 'Sheet1', order: 0 },
      { spreadsheetId: 'spreadsheet2', name: 'SheetA', order: 0 },
      { spreadsheetId: 'spreadsheet1', name: 'Sheet2', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.remove('Sheet1');
    });

    expect(result.current.sheets).toHaveLength(1);
    expect(result.current.sheets[0].name).toBe('Sheet2');

    // Verify other spreadsheet's sheets are preserved
    const allSheets = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
    expect(allSheets.some((s: { name: string }) => s.name === 'SheetA')).toBe(true);
  });

  it('reorders sheets within spreadsheet', () => {
    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('Sheet1');
      result.current.add('Sheet2');
      result.current.add('Sheet3');
    });

    act(() => {
      result.current.reorder([
        { spreadsheetId: 'spreadsheet1', name: 'Sheet3', order: 2 },
        { spreadsheetId: 'spreadsheet1', name: 'Sheet1', order: 0 },
        { spreadsheetId: 'spreadsheet1', name: 'Sheet2', order: 1 },
      ]);
    });

    expect(result.current.sheets[0].name).toBe('Sheet3');
    expect(result.current.sheets[1].name).toBe('Sheet1');
    expect(result.current.sheets[2].name).toBe('Sheet2');
  });

  it('returns sorted sheets by order', () => {
    const stored = [
      { spreadsheetId: 'spreadsheet1', name: 'C', order: 2 },
      { spreadsheetId: 'spreadsheet1', name: 'A', order: 0 },
      { spreadsheetId: 'spreadsheet1', name: 'B', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSheets('spreadsheet1'));

    expect(result.current.sheets[0].name).toBe('A');
    expect(result.current.sheets[1].name).toBe('B');
    expect(result.current.sheets[2].name).toBe('C');
  });

  it('assigns correct order when adding to existing sheets', () => {
    const stored = [
      { spreadsheetId: 'spreadsheet1', name: 'Sheet1', order: 0 },
      { spreadsheetId: 'spreadsheet1', name: 'Sheet2', order: 1 },
    ];
    localStorageMock.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(stored));

    const { result } = renderHook(() => useSheets('spreadsheet1'));

    act(() => {
      result.current.add('Sheet3');
    });

    expect(result.current.sheets[2].order).toBe(2);
  });
});
