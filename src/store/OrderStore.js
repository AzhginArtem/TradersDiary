import { makeAutoObservable } from 'mobx';

export default class OrderStore {
  constructor() {
    this._orders = [
      {
        id: 1,
        Date: '16.03.2023',
        Type: 0,
        Stock: 'Binance',
        Currency1: 'BTC',
        Currency2: 'USDT',
        User: 0,
        Value: 12,
        Price: 10.1,
        Summary: 120.012,
      },
      {
        id: 2,
        Date: '16.03.2023',
        Type: 0,
        Stock: 'Poloniex',
        Currency1: 'BTC',
        Currency2: 'USDT',
        User: 0,
        Value: 12,
        Price: 10.1,
        Summary: 120.12,
      },
      {
        id: 3,
        Date: '10.03.2023',
        Type: 2,
        User: 0,
        Currency1: 'BTC',
        Currency2: 'USDT',
        Stock: 'Binance',
        Value: 12,
        Price: 10.1,
        Summary: 120.12,
      },
      {
        id: 4,
        Date: '15.02.2023',
        Type: 1,
        Stock: 'Bitmex',
        Currency1: 'BTC',
        Currency2: 'USDT',
        User: 0,
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
