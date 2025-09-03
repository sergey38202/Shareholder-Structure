import React from 'react';

interface IAppRoute {
  path: string;
  component: React.LazyExoticComponent<React.FC> | React.FC;
}

const HomePage = React.lazy(() => import('@/pages/Home'));

export const routes: IAppRoute[] = [
  {
    path: '/',
    component: HomePage,
  },
];
