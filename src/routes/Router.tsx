import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SpreadsheetList } from '../components/SpreadsheetList';
import { SheetList } from '../components/SheetList';
import { QuizPage } from '../components/QuizPage';
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
      path: '/:spreadsheetId/:sheetName',
      element: <QuizPage />,
    },
    {
      path: '*',
      element: <RedirectLegacy />,
    },
  ],
  {
    basename: '/sheet-quiz/',
  }
);

export const Router = () => <RouterProvider router={router} />;
