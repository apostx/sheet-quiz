import { useState } from 'react';
import { safeGetItem, safeSetItem } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return safeGetItem(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    safeSetItem(key, valueToStore);
  };

  return [storedValue, setValue] as const;
}
