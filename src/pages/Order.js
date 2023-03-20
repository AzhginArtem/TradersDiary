import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const OrderTypes = {
  0: 'Пополнение',
  1: 'Продажа',
  2: 'Покупка',
  3: 'Вывод',
};

const OrderNames = {
  Type: 'Тип сделки',
  Stock: 'Биржа',
  Currency1: 'Валюта №1',
  Currency2: 'Валюта №2',
  Value: 'Количество контрактов',
  Price: 'Цена',
  Summary: 'Сумма сделки',
  Date: 'Дата',
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
          return key === 'id' || key === 'User' ? (
            ''
          ) : (
            <div key={key}>
              <div className="order__block">
                <h4 className="order__title">{OrderNames[key]}</h4>
                <p>{key == 'Type' ? OrderTypes[order[key]] : order[key]}</p>
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
