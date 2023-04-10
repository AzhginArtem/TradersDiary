import React, { useEffect, useState } from 'react';
import './IosPopUp.sass';
import IosShareBtn from './../../icons/ios-share.svg';
import IosAddBtn from './../../icons/add-ios.svg';

const IosPopUp = () => {
  const [isShown, setIsShown] = useState(true);

  return isShown ? (
    <div className="popup">
      <h2 className="popup__title">Это приложение можно установить!</h2>
      <p>Для этого:</p>
      <ol className="popup__list">
        <li className="popup__item">
          1. Нажмите кнопку "Поделиться"
          <img src={IosShareBtn} alt="Share" style={{ width: 20, color: '#fff' }}></img>
        </li>
        <li className="popup__item">
          2. Нажмите кнопку "На экран 'Домой'"
          <img alt="Add" src={IosAddBtn} style={{ width: 20, color: '#fff' }}></img>
        </li>
        <li className="popup__item">3. Нажмите кнопку "Добавить"</li>
      </ol>
      <button
        className="popup__btn"
        onClick={() => {
          setIsShown(false);
        }}>
        Готово
      </button>
    </div>
  ) : (
    <></>
  );
};

export default IosPopUp;
