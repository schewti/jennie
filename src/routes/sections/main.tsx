import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
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
        element: <PageGenerate />,
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
