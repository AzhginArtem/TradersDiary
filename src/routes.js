import Auth from './pages/Auth';
import Deposit from './pages/Deposit';
import Main from './pages/Main';
import NewOrder from './pages/NewOrder';
import Order from './pages/Order';
import Profile from './pages/Profile';
import {
  DEPOSIT_ROUTE,
  MAIN_ROUTE,
  NEW_ORDER_ROUTE,
  ORDERS_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
} from './utils/consts';

export const AuthRoutes = [
  {
    path: ORDERS_ROUTE,
    Component: Main,
  },
  {
    path: NEW_ORDER_ROUTE,
    Component: NewOrder,
  },
  {
    path: ORDER_ROUTE + '/:id',
    Component: Order,
  },
  {
    path: DEPOSIT_ROUTE,
    Component: Deposit,
  },
  {
    path: PROFILE_ROUTE + '/:id',
    Component: Profile,
  },
];

export const PublicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Auth,
  },
  {
    path: MAIN_ROUTE,
    Component: Auth,
  },
];
