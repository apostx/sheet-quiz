import { Link, useParams } from 'react-router-dom';
import { ListManager } from './ListManager';
import { useSheets } from '../hooks/useSheets';
import type { StoredSheet } from '../types/storage';

export const SheetList = () => {
  const { spreadsheetId } = useParams<{ spreadsheetId: string }>();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <nav className="mb-4">
            <Link to="/" className="text-blue-600 hover:underline text-sm sm:text-base">
              ← Back to Spreadsheets
            </Link>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Sheet</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 break-all">Spreadsheet: {spreadsheetId}</p>
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
              to={`/${spreadsheetId}/${encodeURIComponent(item.name)}`}
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
