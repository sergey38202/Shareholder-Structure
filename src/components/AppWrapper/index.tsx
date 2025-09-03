import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@/components';

export const AppWrapper: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};
