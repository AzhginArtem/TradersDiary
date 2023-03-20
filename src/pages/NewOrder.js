import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Context } from '..';

const NewOrder = (props) => {
  let date = new Date();
  const [typeInput, setTypeInput] = useState('');
  const [dateInput, setDateInput] = useState(
    date.getFullYear() +
      '-' +
      ((date.getMonth() + 1).toString().length === 1
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      date.getDate(),
  );
  const displayWidth = window.innerWidth < 1400 ? 20 : 50;

  const [stockInput, setStockInput] = useState('');
  const [firstCurrencyInput, setFirstCurrencyInput] = useState('');
  const [secondCurrencyInput, setSecondCurrencyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');

  const { orders } = useContext(Context);

  const getSummary = () => {
    setSummaryInput(valueInput * priceInput);
  };

  const hideAllSearches = () => {
    document.getElementById('StockSearchBlock').classList.remove('new__search_show');
    document.getElementById('Currency1SearchBlock').classList.remove('new__search_show');
    document.getElementById('Currency2SearchBlock').classList.remove('new__search_show');
  };

  useEffect(() => {
    getSummary();
    props.setAppBarTitle('Добавление сделки');
  }, [priceInput, valueInput]);

  const StocksForInput = Array.from(new Set(orders.orders.map((e) => e.Stock)));
  const CurrenciesForInput = ['BTC', 'USDT', 'ETH', 'XMR'];

  return (
    <div className="new">
      <Link
        to={'/main'}
        style={{
          width: displayWidth,
          height: displayWidth,
          position: 'absolute',
          top: '2%',
          left: '5%',
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            width: displayWidth,
            height: displayWidth,
          }}
          color="#fff"
          fixedWidth
          onClick={(e) => {
            props.setAppBarTitle('Сделки');
          }}
        />
      </Link>

      <form className="new__form">
        <div className="new__block">
          <label htmlFor="login" className="new__label">
            Тип сделки:
          </label>
          <select className="new__input" name="type" onChange={(e) => setTypeInput(e.target.value)}>
            <option value="Пополнение" defaultValue={'add'}>
              Пополнение
            </option>
            <option value="Покупка">Покупка</option>
            <option value="Продажа">Продажа</option>
            <option value="Вывод средств">Вывод средств</option>
          </select>
        </div>
        <div className="new__block">
          <label htmlFor="FIO" className="new__label">
            Дата:
          </label>
          <input
            type="date"
            id="FIO"
            value={dateInput}
            className="new__input"
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
        <div className="new__block">
          <label htmlFor="stock" className="new__label">
            Биржа:
          </label>
          <input
            type="search"
            id="stock"
            className="new__input"
            value={stockInput}
            onChange={(e) => {
              setStockInput(e.target.value);
              hideAllSearches();
              document.getElementById('StockSearchBlock').classList.add('new__search_show');
            }}
          />
          <ul className="new__search" id="StockSearchBlock">
            {StocksForInput.map((stock) => (
              <li
                key={stock}
                onClick={(e) => {
                  setStockInput(e.target.innerHTML);
                  document.getElementById('StockSearchBlock').classList.remove('new__search_show');
                }}>
                {stock}
              </li>
            ))}
          </ul>
        </div>
        <div className="new__block">
          <label htmlFor="currency1" className="new__label">
            Валюта №1:
          </label>
          <input
            type="search"
            id="currency1"
            className="new__input"
            value={firstCurrencyInput}
            onChange={(e) => {
              setFirstCurrencyInput(e.target.value);
              hideAllSearches();
              document.getElementById('Currency1SearchBlock').classList.add('new__search_show');
            }}
          />
          <ul className="new__search" id="Currency1SearchBlock">
            {CurrenciesForInput.map((currency) => (
              <li
                key={currency}
                onClick={(e) => {
                  setFirstCurrencyInput(e.target.innerHTML);
                  document
                    .getElementById('Currency1SearchBlock')
                    .classList.remove('new__search_show');
                }}>
                {currency}
              </li>
            ))}
          </ul>
        </div>
        <div className="new__block">
          <label htmlFor="currency2" className="new__label">
            Валюта №2:
          </label>
          <input
            type="search"
            id="currency2"
            className="new__input"
            value={secondCurrencyInput}
            onChange={(e) => {
              setSecondCurrencyInput(e.target.value);
              hideAllSearches();
              document.getElementById('Currency2SearchBlock').classList.add('new__search_show');
            }}
          />
          <ul className="new__search" id="Currency2SearchBlock">
            {CurrenciesForInput.map((currency) => (
              <li
                key={currency}
                onClick={(e) => {
                  setSecondCurrencyInput(e.target.innerHTML);
                  document
                    .getElementById('Currency2SearchBlock')
                    .classList.remove('new__search_show');
                }}>
                {currency}
              </li>
            ))}
          </ul>
        </div>
        <div className="new__block">
          <label htmlFor="value" className="new__label">
            Количество контрактов:
          </label>
          <input
            type="text"
            value={valueInput}
            onChange={(e) => {
              setValueInput(e.target.value);
              getSummary();
            }}
            id="value"
            className="new__input"
          />
        </div>
        <div className="new__block">
          <label htmlFor="price" className="new__label">
            Цена:
          </label>
          <input
            type="text"
            id="price"
            className="new__input"
            value={priceInput}
            onChange={(e) => {
              setPriceInput(e.target.value);
              getSummary();
            }}
          />
        </div>
        <div className="new__block">
          <label htmlFor="summary" className="new__label">
            Сумма сделки:
          </label>
          <input type="text" id="summary" readOnly className="new__input" value={summaryInput} />
        </div>
      </form>
      <Link to={'/main'} className="auth__btn">
        Сохранить сделку
      </Link>
    </div>
  );
};

export default NewOrder;
