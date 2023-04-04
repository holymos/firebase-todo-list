import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Todos = lazy(() => import('@pages/Todos'));
const Home = lazy(() => import('@pages/Home'));

import { PrivateRoutes } from './private';
import { HomeRedirect } from './public';

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<HomeRedirect />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Todos />} path="/todos" />
        </Route>
      </Routes>
    </Suspense>
  );
};
