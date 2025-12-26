import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, type StoredSheet } from '../types/storage';

export function useSheets(spreadsheetId: string) {
  const [allSheets, setAllSheets] = useLocalStorage<StoredSheet[]>(
    STORAGE_KEYS.SHEETS,
    []
  );

  const sheets = useMemo(
    () =>
      allSheets
        .filter((s) => s.spreadsheetId === spreadsheetId)
        .sort((a, b) => a.order - b.order),
    [allSheets, spreadsheetId]
  );

  const add = useCallback(
    (name: string) => {
      if (!name.trim()) return;

      if (sheets.some((s) => s.name === name)) {
        alert('This sheet name is already in your list for this spreadsheet.');
        return;
      }

      const maxOrder = Math.max(-1, ...sheets.map((s) => s.order));
      const newSheet: StoredSheet = {
        spreadsheetId,
        name: name.trim(),
        order: maxOrder + 1,
      };
      setAllSheets([...allSheets, newSheet]);
    },
    [allSheets, setAllSheets, sheets, spreadsheetId]
  );

  const remove = useCallback(
    (name: string) => {
      const filtered = allSheets.filter(
        (s) => !(s.spreadsheetId === spreadsheetId && s.name === name)
      );
      const reordered = filtered.map((s) => {
        if (s.spreadsheetId !== spreadsheetId) return s;
        const sheetsInGroup = filtered.filter((f) => f.spreadsheetId === spreadsheetId);
        const index = sheetsInGroup.indexOf(s);
        return { ...s, order: index };
      });
      setAllSheets(reordered);
    },
    [allSheets, setAllSheets, spreadsheetId]
  );

  const reorder = useCallback(
    (items: StoredSheet[]) => {
      const reorderedCurrentSheets = items.map((s, index) => ({ ...s, order: index }));
      const otherSheets = allSheets.filter((s) => s.spreadsheetId !== spreadsheetId);
      setAllSheets([...otherSheets, ...reorderedCurrentSheets]);
    },
    [allSheets, setAllSheets, spreadsheetId]
  );

  return {
    sheets,
    add,
    remove,
    reorder,
  };
}
