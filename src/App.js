import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import AppBar from './components/AppBar/AppBar';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBar title="Регистрация" />
      <AppRouter />
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
