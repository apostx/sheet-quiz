import { Link, Navigate } from 'react-router-dom';
import { ListManager } from './ListManager';
import { useSpreadsheets } from '../hooks/useSpreadsheets';
import { getQuizParams } from '../utils/url';
import type { StoredSpreadsheet } from '../types/storage';

export const SpreadsheetList = () => {
  // Check for old URL param format and redirect
  const params = getQuizParams();
  if (params?.spreadsheetId && params?.sheet) {
    const newPath = `/${params.spreadsheetId}/${encodeURIComponent(params.sheet)}`;
    const search = params.max ? `?max=${params.max}` : '';
    return <Navigate to={newPath + search} replace />;
  }

  const { spreadsheets, add, remove, reorder } = useSpreadsheets();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sheet Quiz</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Select a spreadsheet to view available quizzes</p>
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
              to={`/${item.id}`}
              className="block hover:text-blue-600 transition-colors"
            >
              {item.id}
            </Link>
          )}
        />
      </div>
    </div>
  );
};
