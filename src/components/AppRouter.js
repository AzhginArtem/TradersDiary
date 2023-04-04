import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';
import { AuthRoutes, PublicRoutes } from '../routes';

const AppRouter = observer((props) => {
  const { user } = useContext(Context);
  return (
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
  );
});

export default AppRouter;
