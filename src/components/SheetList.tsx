import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ListManager } from './ListManager';
import { ShareButton } from './ShareButton';
import { useSheets } from '../hooks/useSheets';
import { decodeShareData } from '../utils/share';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { STORAGE_KEYS, type StoredSheet } from '../types/storage';

export const SheetList = () => {
  const { spreadsheetId } = useParams<{ spreadsheetId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const maxParam = searchParams.get('max');

  // Helper to preserve max parameter in navigation links
  const getSearchString = () => maxParam ? `?max=${maxParam}` : '';

  if (!spreadsheetId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>Missing spreadsheet ID</p>
        </div>
      </div>
    );
  }

  const { sheets, add, remove, reorder } = useSheets(spreadsheetId);

  // Import shared data on mount
  useEffect(() => {
    const importParam = searchParams.get('import');
    if (!importParam) return;

    const data = decodeShareData(importParam);
    if (!data) return;

    // Only import sheets for current spreadsheet - access localStorage directly
    if (data.sheets) {
      const sheetsToImport = data.sheets.filter((s) => s.spreadsheetId === spreadsheetId);
      if (sheetsToImport.length > 0) {
        const storedSheets = safeGetItem<StoredSheet[]>(STORAGE_KEYS.SHEETS, []);
        const newAllSheets = [...storedSheets];
        const currentSheetsForSpreadsheet = newAllSheets.filter(
          (s) => s.spreadsheetId === spreadsheetId
        );
        const maxOrder = Math.max(-1, ...currentSheetsForSpreadsheet.map((s) => s.order));
        let addedCount = 0;

        sheetsToImport.forEach((sheet) => {
          // Only add if not already in list
          if (!newAllSheets.some((s) => s.spreadsheetId === sheet.spreadsheetId && s.name === sheet.name)) {
            newAllSheets.push({
              spreadsheetId,
              name: sheet.name,
              order: maxOrder + 1 + addedCount,
            });
            addedCount++;
          }
        });

        if (addedCount > 0) {
          safeSetItem(STORAGE_KEYS.SHEETS, newAllSheets);
          // Remove import param and reload to show imported data
          setSearchParams((params) => {
            params.delete('import');
            return params;
          });
          window.location.reload();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare share data
  const shareData = {
    version: 1 as const,
    sheets: sheets.map((s) => ({ ...s, spreadsheetId })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <nav className="mb-4">
            <Link to={`/${getSearchString()}`} className="text-blue-600 hover:underline text-sm sm:text-base">
              ← Back to Spreadsheets
            </Link>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Sheet</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 break-all">Spreadsheet: {spreadsheetId}</p>
            </div>
            <div className="flex-shrink-0">
              <ShareButton data={shareData} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <ListManager<StoredSheet>
          items={sheets}
          onAdd={add}
          onDelete={(item) => remove(item.name)}
          onReorder={reorder}
          getId={(item) => item.name}
          placeholder="Enter sheet name (e.g., Math Quiz)"
          emptyMessage="No saved sheets yet for this spreadsheet"
          renderItem={(item) => (
            <Link
              to={`/${spreadsheetId}/${encodeURIComponent(item.name)}${getSearchString()}`}
              className="block hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          )}
        />
      </div>
    </div>
  );
};
