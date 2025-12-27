import { useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { ListManager } from './ListManager';
import { ShareButton } from './ShareButton';
import { useSpreadsheets } from '../hooks/useSpreadsheets';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getQuizParams } from '../utils/url';
import { decodeShareData } from '../utils/share';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { STORAGE_KEYS, type StoredSpreadsheet, type StoredSheet } from '../types/storage';

export const SpreadsheetList = () => {
  // Check for old URL param format and redirect
  const params = getQuizParams();
  if (params?.spreadsheetId && params?.sheet) {
    const newPath = `/${params.spreadsheetId}/${encodeURIComponent(params.sheet)}`;
    const search = params.max ? `?max=${params.max}` : '';
    return <Navigate to={newPath + search} replace />;
  }

  const { spreadsheets, add, remove, reorder } = useSpreadsheets();
  const [allSheets] = useLocalStorage<StoredSheet[]>(STORAGE_KEYS.SHEETS, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxParam = searchParams.get('max');

  // Helper to preserve max parameter in navigation links
  const getSearchString = () => maxParam ? `?max=${maxParam}` : '';

  // Import shared data on mount
  useEffect(() => {
    const importParam = searchParams.get('import');
    if (!importParam) return;

    const data = decodeShareData(importParam);
    if (!data) return;

    let hasImported = false;

    // Import spreadsheets - access localStorage directly
    if (data.spreadsheets && data.spreadsheets.length > 0) {
      const storedSpreadsheets = safeGetItem<StoredSpreadsheet[]>(STORAGE_KEYS.SPREADSHEETS, []);
      const newSpreadsheets = [...storedSpreadsheets];
      const currentOrder = storedSpreadsheets.length;
      let addedCount = 0;

      data.spreadsheets.forEach((s) => {
        // Only add if not already in list
        if (!newSpreadsheets.some((existing) => existing.id === s.id)) {
          newSpreadsheets.push({
            id: s.id,
            order: currentOrder + addedCount,
          });
          addedCount++;
        }
      });

      if (addedCount > 0) {
        safeSetItem(STORAGE_KEYS.SPREADSHEETS, newSpreadsheets);
        hasImported = true;
      }
    }

    // Import sheets - access localStorage directly
    if (data.sheets && data.sheets.length > 0) {
      const storedSheets = safeGetItem<StoredSheet[]>(STORAGE_KEYS.SHEETS, []);
      const newSheets = [...storedSheets];
      let addedCount = 0;

      data.sheets.forEach((sheet) => {
        // Check if sheet already exists
        if (!newSheets.some((s) => s.spreadsheetId === sheet.spreadsheetId && s.name === sheet.name)) {
          newSheets.push(sheet);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        safeSetItem(STORAGE_KEYS.SHEETS, newSheets);
        hasImported = true;
      }
    }

    // Remove import param and reload to show imported data
    if (hasImported) {
      setSearchParams((params) => {
        params.delete('import');
        return params;
      });
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare share data
  const shareData = {
    version: 1 as const,
    spreadsheets,
    sheets: allSheets,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sheet Quiz</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Select a spreadsheet to view available quizzes</p>
            </div>
            <div className="flex-shrink-0">
              <ShareButton data={shareData} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <ListManager<StoredSpreadsheet>
          items={spreadsheets}
          onAdd={add}
          onDelete={(item) => remove(item.id)}
          onReorder={reorder}
          getId={(item) => item.id}
          placeholder="Enter Google Sheets spreadsheet ID"
          emptyMessage="No saved spreadsheets yet"
          renderItem={(item) => (
            <Link
              to={`/${item.id}${getSearchString()}`}
              className="block hover:text-blue-600 transition-colors break-all"
            >
              {item.id}
            </Link>
          )}
        />
      </div>
    </div>
  );
};
