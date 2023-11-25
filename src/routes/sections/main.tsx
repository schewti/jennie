import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// layouts
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));
const PageGenerate = lazy(() => import('src/pages/generate'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/generate" replace />,
      },
      {
        path: 'generate',
        children: [
          { index: true, element: <PageGenerate /> },
          { path: ':name', element: <PageGenerate /> },
        ],
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
