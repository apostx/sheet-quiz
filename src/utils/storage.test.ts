import { describe, it, expect, beforeEach, vi } from 'vitest';
import { safeGetItem, safeSetItem } from './storage';

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

describe('safeGetItem', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('returns fallback when key does not exist', () => {
    const result = safeGetItem('nonexistent', 'default');
    expect(result).toBe('default');
  });

  it('returns parsed JSON value when key exists', () => {
    localStorageMock.setItem('test', JSON.stringify({ foo: 'bar' }));
    const result = safeGetItem('test', {});
    expect(result).toEqual({ foo: 'bar' });
  });

  it('returns fallback on invalid JSON', () => {
    localStorageMock.setItem('test', 'invalid json');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = safeGetItem('test', 'fallback');
    expect(result).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('handles array values', () => {
    localStorageMock.setItem('arr', JSON.stringify([1, 2, 3]));
    const result = safeGetItem('arr', []);
    expect(result).toEqual([1, 2, 3]);
  });

  it('handles primitive values', () => {
    localStorageMock.setItem('num', JSON.stringify(42));
    expect(safeGetItem('num', 0)).toBe(42);

    localStorageMock.setItem('bool', JSON.stringify(true));
    expect(safeGetItem('bool', false)).toBe(true);

    localStorageMock.setItem('str', JSON.stringify('hello'));
    expect(safeGetItem('str', '')).toBe('hello');
  });
});

describe('safeSetItem', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('returns true on successful write', () => {
    const result = safeSetItem('key', { data: 'value' });
    expect(result).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify({ data: 'value' }));
  });

  it('handles array values', () => {
    const result = safeSetItem('arr', [1, 2, 3]);
    expect(result).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('arr', '[1,2,3]');
  });

  it('returns false and shows alert on QuotaExceededError', () => {
    const quotaError = new DOMException('Quota exceeded', 'QuotaExceededError');
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw quotaError;
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = safeSetItem('key', 'value');

    expect(result).toBe(false);
    expect(alert).toHaveBeenCalledWith('Storage full. Please delete some saved items.');
    consoleSpy.mockRestore();
  });

  it('returns false on other errors', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Unknown error');
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = safeSetItem('key', 'value');

    expect(result).toBe(false);
    expect(alert).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
