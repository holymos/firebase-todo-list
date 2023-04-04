import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@contexts/auth';

export const HomeRedirect = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/todos" replace />;

  return <Outlet />;
};
