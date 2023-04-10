import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

//User requests
export const registration = async (fio, login, password, email, phone) => {
  const { data } = await $host.post('/api/user/registration', {
    fio,
    login,
    password,
    email,
    phone,
  });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const login = async (login, password) => {
  const { data } = await $host.post('/api/user/login', { login, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('/api/user/auth');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const logOut = async () => {
  localStorage.removeItem('token');
};

export const change = async (fio, login, password, email, phone, userid) => {
  const { data } = await $host.post('/api/user/change', {
    fio,
    login,
    password,
    email,
    phone,
    userid,
  });
  return jwt_decode(data.token);
};

//Orders requests

export const mainOrders = async (id) => {
  const { data } = await $authHost.post('/api/order/', id);
  return data;
};

export const getStocks = async () => {
  const { data } = await $authHost.get('/api/order/stocks');
  return data;
};

export const getCurrencies = async () => {
  const { data } = await $authHost.get('/api/order/currencies');
  return data;
};

export const createOrder = async (
  date,
  currency1,
  currency2,
  stock,
  userId,
  orderType,
  value,
  price,
  summary,
) => {
  const { data } = await $authHost.post('/api/order/create', {
    date,
    currency1,
    currency2,
    stock,
    userId,
    orderType,
    value,
    price,
    summary,
  });
  return data;
};
