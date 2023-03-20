import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import OrderStore from './store/OrderStore';
import UserStore from './store/UserStore';
import './style.sass';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ user: new UserStore(), orders: new OrderStore() }}>
    <App />
  </Context.Provider>,
);
