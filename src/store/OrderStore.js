import { makeAutoObservable } from 'mobx';

export default class OrderStore {
  constructor() {
    this._orders = [
      {
        id: 0,
        Currency1: 0,
        Currency2: 0,
        Stock: 0,
        User: 0,
        Type: 0,
        Date: '16.03.2023',
        Value: 12,
        Price: 10.1,
        Summary: 120.12,
      },
      {
        id: 1,
        Currency1: 1,
        Currency2: 1,
        Stock: 1,
        User: 1,
        Type: 1,
        Date: '15.02.2023',
        Value: 100,
        Price: 12,
        Summary: 1200,
      },
    ];
  }

  setOrders(orders) {
    this._orders = orders;
  }

  get orders() {
    return this._orders;
  }
}
