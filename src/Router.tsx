import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Catalog } from './pages/Catalog/Catalog';
import { Main } from './pages/Main';
import { path } from './consts/paths';
import { Booking } from './pages/Booking';
import { Settings } from './pages/Settings/Settings';

export const Router = () => {
  return (
    <Routes>
      <Route path={path.home} element={<Main />} />
      <Route path={path.catalog} element={<Catalog />} />
      <Route path={path.booking} element={<Booking />} />
      <Route path={path.settings} element={<Settings />} />
    </Routes>
  );
};
