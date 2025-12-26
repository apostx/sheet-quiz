import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, type StoredSpreadsheet } from '../types/storage';

export function useSpreadsheets() {
  const [spreadsheets, setSpreadsheets] = useLocalStorage<StoredSpreadsheet[]>(
    STORAGE_KEYS.SPREADSHEETS,
    []
  );

  const add = useCallback(
    (id: string) => {
      if (!id.trim()) return;

      if (spreadsheets.some((s) => s.id === id)) {
        alert('This spreadsheet ID is already in your list.');
        return;
      }

      const newSpreadsheet: StoredSpreadsheet = {
        id: id.trim(),
        order: spreadsheets.length,
      };
      setSpreadsheets([...spreadsheets, newSpreadsheet]);
    },
    [spreadsheets, setSpreadsheets]
  );

  const remove = useCallback(
    (id: string) => {
      const filtered = spreadsheets.filter((s) => s.id !== id);
      const reordered = filtered.map((s, index) => ({ ...s, order: index }));
      setSpreadsheets(reordered);
    },
    [spreadsheets, setSpreadsheets]
  );

  const reorder = useCallback(
    (items: StoredSpreadsheet[]) => {
      const reordered = items.map((s, index) => ({ ...s, order: index }));
      setSpreadsheets(reordered);
    },
    [setSpreadsheets]
  );

  const sortedSpreadsheets = [...spreadsheets].sort((a, b) => a.order - b.order);

  return {
    spreadsheets: sortedSpreadsheets,
    add,
    remove,
    reorder,
  };
}
