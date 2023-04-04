import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const OrderTypes = {
  1: 'Пополнение',
  2: 'Продажа',
  3: 'Покупка',
  4: 'Вывод',
};

const OrderNames = {
  orderType: 'Тип сделки',
  stock: 'Биржа',
  currency1: 'Валюта №1',
  currency2: 'Валюта №2',
  value: 'Количество контрактов',
  price: 'Цена',
  summary: 'Сумма сделки',
  date: 'Дата',
};

const Order = (props) => {
  const { id } = useParams();
  const { orders } = useContext(Context);
  const order = orders.orders.find((obj) => obj.id == id);
  const navigate = useNavigate();
  const displayWidth = window.innerWidth < 1400 ? 20 : 50;

  useEffect(() => {
    props.setAppBarTitle('Сделка №' + id);
  });

  return (
    <>
      <>
        <FontAwesomeIcon
          icon={faArrowLeft}
          color="#fff"
          fixedWidth
          style={{
            width: displayWidth,
            height: displayWidth,
            position: 'absolute',
            top: '2%',
            left: '5%',
          }}
          onClick={(e) => {
            props.setAppBarTitle('Сделки');
            navigate('/main');
          }}
          className="order__back"
        />
      </>
      <div className="order">
        {Object.keys(order).map((key, i) => {
          return key === 'id' ||
            key === 'userId' ||
            key === 'stockId' ||
            key === 'currency1Id' ||
            key === 'currency2Id' ||
            key === 'orderTypeId' ? (
            ''
          ) : (
            <div key={key}>
              <div className="order__block">
                <h4 className="order__title">{OrderNames[key]}</h4>
                <p>{typeof order[key] === 'object' ? order[key].name : order[key]}</p>
              </div>
              {Object.keys(order).length - 1 !== i ? (
                <hr style={{ width: '100%', border: 'none', background: '#fff', height: 2 }}></hr>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
      <button className="order__btn">Сделка исполнена</button>
    </>
  );
};

export default Order;
