import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SpreadsheetList } from '../components/SpreadsheetList';
import { SheetList } from '../components/SheetList';
import { QuizPage } from '../components/QuizPage';
import { ResultsPage } from '../components/ResultsPage';
import { SearchPage } from '../components/SearchPage';
import { RedirectLegacy } from './RedirectLegacy';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SpreadsheetList />,
    },
    {
      path: '/:spreadsheetId',
      element: <SheetList />,
    },
    {
      path: '/:spreadsheetId/:sheetName/search',
      element: <SearchPage />,
    },
    {
      path: '/:spreadsheetId/:sheetName/results',
      element: <ResultsPage />,
    },
    {
      path: '/:spreadsheetId/:sheetName',
      element: <QuizPage />,
    },
    {
      path: '*',
      element: <RedirectLegacy />,
    },
  ],
  {}
);

export const Router = () => <RouterProvider router={router} />;
