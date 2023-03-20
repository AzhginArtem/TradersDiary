import React, { useContext, useEffect } from 'react';
import { Context } from '..';

const Deposit = (props) => {
  const { orders } = useContext(Context);
  const valueFields = ['Value'];
  let parsedOrders = [];

  parsedOrders = Object.values(
    orders.orders.reduce((element, { Stock, ...values }) => {
      element[Stock] = element[Stock] || { Stock };
      valueFields.forEach((value) => {
        switch (values.Type) {
          case 0 || 2:
            element[Stock][value] = (element[Stock][value] || 0) + values[value];
            break;
          case 1 || 3:
            element[Stock][value] = (element[Stock][value] || 0) - values[value];
            break;
          default:
            element[Stock][value] = (element[Stock][value] || 0) + values[value];
            break;
        }
      });
      element[Stock].Currency1 = element[Stock].Currency1 || values.Currency1;
      element[Stock].Currency2 = element[Stock].Currency2 || values.Currency2;
      element[Stock].Summary = element[Stock].Summary || values.Summary;
      return element;
    }, {}),
  );

  useEffect(() => {
    props.setAppBarTitle('Депозит');
  }, []);

  return (
    <div className="deposit">
      {parsedOrders.map((el) => {
        return (
          <div key={el.Stock} className="deposit__block">
            <h3 className="deposit__title">{el.Stock}</h3>
            <p className="deposit__subtitle">
              {el.Currency1}: {el.Value}
            </p>
            <p className="deposit__subtitle">
              {el.Currency2}: {el.Summary}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Deposit;
