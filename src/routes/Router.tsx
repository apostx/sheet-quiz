import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SpreadsheetList } from '../components/SpreadsheetList';
import { SheetList } from '../components/SheetList';
import { QuizPage } from '../components/QuizPage';
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
