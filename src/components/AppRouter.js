import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';
import { AuthRoutes, PublicRoutes } from '../routes';

const AppRouter = (props) => {
  const { user } = useContext(Context);
  return (
    <div className="main">
      <Routes>
        {user.isAuth &&
          AuthRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component setAppBarTitle={props.setTitle} />}
              exact
            />
          ))}

        {PublicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component setAppBarTitle={props.setTitle} />}
            exact
          />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
