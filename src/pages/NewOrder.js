import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { createOrder, getStocks, getCurrencies } from '../http/userApi';
import { useNavigate } from 'react-router-dom';
import { ORDERS_ROUTE } from '../utils/consts';

const NewOrder = (props) => {
  const date = new Date();
  const { user } = useContext(Context);
  const [dateInput, setDateInput] = useState(
    date.getFullYear() +
      '-' +
      ((date.getMonth() + 1).toString().length === 1
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()),
  );
  const [stockInput, setStockInput] = useState('');
  const [firstCurrencyInput, setFirstCurrencyInput] = useState('');
  const [secondCurrencyInput, setSecondCurrencyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [stocks, setStocks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [typeInput, setTypeInput] = useState('Пополнение');
  const displayWidth = window.innerWidth < 1400 ? 20 : 50;
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const data = await createOrder(
      dateInput,
      firstCurrencyInput,
      secondCurrencyInput,
      stockInput,
      user.user.id,
      typeInput,
      valueInput,
      priceInput,
      summaryInput,
    );
    if (data.code !== 'ERR_NETWORK') navigate(ORDERS_ROUTE);
  };

  const getSummary = () => {
    setSummaryInput(valueInput * priceInput);
  };

  const getSearchValues = async () => {
    setStocks(await getStocks());
    setCurrencies(await getCurrencies());
  };

  const hideAllSearches = () => {
    document.getElementById('StockSearchBlock').classList.remove('new__search_show');
    document.getElementById('Currency1SearchBlock').classList.remove('new__search_show');
    document.getElementById('Currency2SearchBlock').classList.remove('new__search_show');
  };

  useEffect(() => {
    props.setAppBarTitle('Добавление сделки');
    getSearchValues();
    getSummary();
  }, [priceInput, valueInput]);

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
            {stocks.map((stock) =>
              stock.name.toLowerCase().includes(stockInput.toLowerCase()) ? (
                <li
                  key={stock.id}
                  onClick={(e) => {
                    setStockInput(e.target.innerHTML);
                    document
                      .getElementById('StockSearchBlock')
                      .classList.remove('new__search_show');
                  }}>
                  {stock.name}
                </li>
              ) : (
                <li key={stock.id}></li>
              ),
            )}
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
            {currencies.map((currency) =>
              currency.name.toLowerCase().includes(firstCurrencyInput.toLowerCase()) ? (
                <li
                  key={currency.id}
                  onClick={(e) => {
                    setFirstCurrencyInput(e.target.innerHTML);
                    document
                      .getElementById('Currency1SearchBlock')
                      .classList.remove('new__search_show');
                  }}>
                  {currency.name}
                </li>
              ) : (
                <li key={currency.id}></li>
              ),
            )}
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
            {currencies.map((currency) =>
              currency.name.toLowerCase().includes(secondCurrencyInput.toLowerCase()) ? (
                <li
                  key={currency.id}
                  onClick={(e) => {
                    setSecondCurrencyInput(e.target.innerHTML);
                    document
                      .getElementById('Currency2SearchBlock')
                      .classList.remove('new__search_show');
                  }}>
                  {currency.name}
                </li>
              ) : (
                <li key={currency.id}></li>
              ),
            )}
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
      <Link onClick={(e) => handleForm(e)} className="auth__btn">
        Сохранить сделку
      </Link>
    </div>
  );
};

export default NewOrder;
