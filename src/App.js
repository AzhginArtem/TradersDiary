import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import AppBar from './components/AppBar/AppBar';
import { useState } from 'react';

function App() {
  const [appBarTitle, setAppBarTitle] = useState('');
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBar title={appBarTitle} />
      <AppRouter setTitle={setAppBarTitle} />
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
