import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import ArrowImage from '../icons/ArrowImage.svg';
import BitmexImage from '../icons/Bitmex.png';
import BinanceImage from '../icons/Binance.png';
import PoloniexImage from '../icons/Poloniex.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const StockNames = {
  Binance: BinanceImage,
  Bitmex: BitmexImage,
  Poloniex: PoloniexImage,
};

const OrderTypes = {
  0: [180, '#DDAC00'],
  1: [-90, '#FF1414'],
  2: [90, '#039900'],
};

const Main = (props) => {
  const valueFields = ['Value', 'Summary'];
  const { orders } = useContext(Context);
  const [concreteOrders, setConcreteOrders] = useState([]);
  const [isChoosed, setIsChoosed] = useState(false);
  const displayWidth = window.innerWidth < 1400 ? 20 : 50;

  const parseAllOrders = () => {
    return Object.values(
      orders.orders.reduce((acc, { Stock, ...values }) => {
        acc[Stock] = acc[Stock] || { Stock };
        valueFields.forEach((field) => {
          acc[Stock][field] = (acc[Stock][field] || 0) + values[field];
        });
        return acc;
      }, {}),
    );
  };

  let parsedOrders = [];

  useEffect(() => {
    props.setAppBarTitle('Сделки');
  }, []);

  const getCountOfOrders = (name) => {
    return orders.orders.filter((order) => order.Stock === name).length;
  };

  const getOrdersByName = async (name) => {
    props.setAppBarTitle('Сделки на ' + name);
    await setConcreteOrders(orders.orders.filter((order) => order.Stock === name));
    await setIsChoosed(concreteOrders != []);
  };

  const res = parseAllOrders();
  parsedOrders = res;
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
          <Link to="/neworder" className="orders__adder">
            +
          </Link>
        </>
      ) : (
        <></>
      )}
      {!isChoosed ? (
        parsedOrders.map((order, i) => {
          let isShown = false;
          return (
            <div key={orders.orders[i].id} className="orders__block">
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
                  <h3 className="orders__title">{order.Stock}</h3>
                </div>
                <img src={StockNames[order.Stock]} alt="" className="orders__img" />
              </div>
              <div className="orders__stats">
                <div>
                  <p className="orders__stat">Сделок: {getCountOfOrders(order.Stock)}</p>
                  <p className="orders__stat">Количество контрактов: {order.Value}</p>
                  <p className="orders__stat">Средняя цена: {order.Summary}</p>
                  <p
                    href="/TradersDiary/main"
                    onClick={(e) => {
                      e.preventDefault();
                      getOrdersByName(order.Stock);
                    }}
                    className="orders__btn">
                    Посмотреть все сделки
                  </p>
                </div>
                <p
                  href="/TradersDiary/main"
                  onClick={(e) => {
                    e.preventDefault();
                    getOrdersByName(order.Stock);
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
      ) : (
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
                  color={OrderTypes[order.Type][1]}
                  fixedWidth
                  style={{
                    width: 20,
                    height: 20,
                    transform: 'rotate(' + OrderTypes[order.Type][0] + 'deg)',
                    marginRight: 15,
                  }}
                />
                <div className="orders__txt">
                  <div className="orders__txt_top">
                    <h4>{order.Currency1 + '/' + order.Currency2}</h4>
                    <p>{order.Date}</p>
                  </div>
                  <div>
                    <p>Количество контрактов: {order.Value}</p>
                    <p>Цена: {order.Price}</p>
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
      )}
    </div>
  );
};

export default Main;
