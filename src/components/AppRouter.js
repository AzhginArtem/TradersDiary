import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';
import Auth from '../pages/Auth';
import { AuthRoutes, PublicRoutes } from '../routes';

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <div className="main">
      <Routes>
        {user.isAuth &&
          AuthRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} exact />
          ))}

        {PublicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
