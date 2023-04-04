import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { mainOrders } from '../http/userApi';

const Deposit = (props) => {
  const { user, orders } = useContext(Context);
  const { id } = user.user;
  const valueFields = ['value'];
  let parsedOrders = [];
  const [allOrders, setAllOrders] = useState([]);

  const getOrders = async () => {
    let order = await mainOrders({ id });
    orders.setOrders(order);
    setAllOrders(order);
  };

  parsedOrders = Object.values(
    orders.orders.reduce((element, { stockId, ...values }) => {
      element[stockId] = element[stockId] || { stockId };
      valueFields.forEach((value) => {
        switch (element.orderTypeId) {
          case 1 || 3:
            element[stockId][value] = (element[stockId][value] || 0) + values[value];
            break;
          case 2 || 4:
            element[stockId][value] = (element[stockId][value] || 0) - values[value];
            break;
          default:
            element[stockId][value] = (element[stockId][value] || 0) + values[value];
            break;
        }
      });
      element[stockId].currency1 = element[stockId].currency1 || values.currency1.name;
      element[stockId].currency2 = element[stockId].currency2 || values.currency2.name;
      element[stockId].summary = element[stockId].summary || values.summary;
      return element;
    }, {}),
  );

  useEffect(() => {
    props.setAppBarTitle('Депозит');
    getOrders();
  });

  return (
    <div className="deposit">
      {parsedOrders.map((el) => {
        return (
          <div key={el.stockId} className="deposit__block">
            <h3 className="deposit__title">{el.stockId}</h3>
            <p className="deposit__subtitle">
              {el.currency1}: {el.value}
            </p>
            <p className="deposit__subtitle">
              {el.currency2}: {el.summary}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Deposit;
