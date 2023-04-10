import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import ArrowImage from '../icons/ArrowImage.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import { mainOrders } from '../http/userApi';

const OrderTypes = {
  Пополнение: [180, '#DDAC00'],
  Покупка: [-90, '#FF1414'],
  Продажа: [90, '#039900'],
  'Вывод средств': [0, '#009900'],
};

const Main = observer((props) => {
  const valueFields = ['value', 'summary', 'orderTypeId'];
  const { user, orders } = useContext(Context);
  const { id } = user.user;
  const [allOrders, setallOrders] = useState([]);
  const [concreteOrders, setConcreteOrders] = useState([]);
  const [isChoosed, setIsChoosed] = useState(false);
  const displayWidth = window.innerWidth < 1400 ? 20 : 50;

  const parseAllOrders = () => {
    return Object.values(
      orders.orders.reduce((acc, { stock, stockId, ...values }) => {
        acc[stockId] = acc[stockId] || { stockId };
        valueFields.forEach((field) => {
          if (field === 'orderTypeId') {
            acc[stockId][field] = acc[stock] || stock.img;
          } else acc[stockId][field] = (acc[stockId][field] || 0) + values[field];
        });
        return acc;
      }, {}),
    );
  };

  const getOrders = async () => {
    let order = await mainOrders({ id });
    orders.setOrders(order);
    setallOrders(parseAllOrders());
  };

  useEffect(() => {
    props.setAppBarTitle('Сделки');
    getOrders();
  }, []);

  const getCountOfOrders = (name) => {
    const arr = orders.orders.map((order) => order.stockId === name);
    return arr.filter((value) => value).length;
  };

  const getOrdersByName = async (name) => {
    props.setAppBarTitle('Сделки на ' + name);
    setConcreteOrders(
      orders.orders.filter((order) => {
        return order.stock.name === name;
      }),
    );
    setIsChoosed(concreteOrders != []);
  };

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <h3 className="orders__empty">У вас еще нет сделок!</h3>
        <Link to="/neworder" className="orders__btn">
          Создать
        </Link>
      </div>
    );
  }
  return (
    <div className="orders">
      {isChoosed ? (
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
              setIsChoosed(false);
            }}
          />
          <div className="orders__concretes">
            {concreteOrders.map((order, i) => (
              <Link
                to={'/order/' + order.id}
                key={order.id}
                style={{ width: '100%' }}
                className="orders__concretes_container">
                <div className="orders__concrete">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color={OrderTypes[order.orderType.name][1]}
                    fixedWidth
                    style={{
                      width: 20,
                      height: 20,
                      transform: 'rotate(' + OrderTypes[order.orderType.name][0] + 'deg)',
                      marginRight: 15,
                    }}
                  />
                  <div className="orders__txt">
                    <div className="orders__txt_top">
                      <h4>{order.currency1.name + '/' + order.currency2.name}</h4>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <p>Количество контрактов: {order.value}</p>
                      <p>Цена: {order.price}</p>
                    </div>
                  </div>
                </div>
                {i !== concreteOrders.length - 1 ? (
                  <hr style={{ width: '100%', height: 2, left: 30 }}></hr>
                ) : (
                  ''
                )}
              </Link>
            ))}
          </div>
        </>
      ) : (
        allOrders.map((order, i) => {
          let isShown = false;
          return (
            <div key={i} className="orders__block">
              <div className="orders__container">
                <div className="orders__text">
                  <img
                    src={ArrowImage}
                    alt=""
                    className="orders__arrow"
                    onClick={(e) => {
                      document.querySelectorAll('.orders__stats')[i].style.display = isShown
                        ? 'none'
                        : 'flex';
                      isShown = !isShown;
                      e.target.style.transform = isShown ? 'rotate(180deg)' : 'rotate(0)';
                    }}
                  />
                  <h3 className="orders__title">{order.stockId}</h3>
                </div>
                <img
                  src={process.env.REACT_APP_API_URL + order.orderTypeId}
                  alt={order.stockId}
                  className="orders__img"
                />
              </div>
              <div className="orders__stats">
                <div>
                  <p className="orders__stat">Сделок:{getCountOfOrders(order.stockId)}</p>
                  <p className="orders__stat">Количество контрактов: {order.value}</p>
                  <p className="orders__stat">
                    Средняя цена: {order.summary / getCountOfOrders(order.stockId)}
                  </p>
                  <p
                    href="/TradersDiary/main"
                    onClick={(e) => {
                      e.preventDefault();
                      getOrdersByName(order.stockId);
                    }}
                    className="orders__btn">
                    Посмотреть все сделки
                  </p>
                </div>
                <p
                  href="/TradersDiary/main"
                  onClick={(e) => {
                    e.preventDefault();
                    getOrdersByName(order.stockId);
                  }}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="#fff"
                    fixedWidth
                    style={{
                      width: 40,
                      height: 40,
                    }}
                    onClick={(e) => {
                      props.setAppBarTitle('Сделки');
                      setIsChoosed(false);
                    }}
                  />
                </p>
              </div>
            </div>
          );
        })
      )}
      <Link to="/neworder" className="orders__adder">
        +
      </Link>
    </div>
  );
});

export default Main;
