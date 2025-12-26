import { Navigate } from 'react-router-dom';
import { getQuizParams } from '../utils/url';

export const RedirectLegacy = () => {
  const params = getQuizParams();

  if (params?.spreadsheetId && params?.sheet) {
    const newPath = `/${params.spreadsheetId}/${encodeURIComponent(params.sheet)}`;
    const search = params.max ? `?max=${params.max}` : '';

    console.log('[RedirectLegacy] Redirecting from old format to:', newPath + search);

    return <Navigate to={newPath + search} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Page Not Found</p>
          <p>The page you're looking for doesn't exist.</p>
        </div>
        <a href="/" className="block text-center text-blue-600 hover:underline">
          Go to Home
        </a>
      </div>
    </div>
  );
};
