import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import AppBar from './components/AppBar/AppBar';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userApi';
import Loader from './components/Loader';

const App = observer(() => {
  const [appBarTitle, setAppBarTitle] = useState('');
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        delete data.exp;
        delete data.iat;
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBar title={appBarTitle} />
      <div className="main">{!loading ? <AppRouter setTitle={setAppBarTitle} /> : <Loader />}</div>
      <NavBar />
    </BrowserRouter>
  );
});

export default App;
