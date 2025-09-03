import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from '@/constants/app-routes';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
