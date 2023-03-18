import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.sass';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link className="navbar__link">
              <img src="/assets/icons/Home.svg" alt="" className="navbar__icon" />
              <span className="navbar__txt">Сделки</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link">
              <img src="/assets/icons/Balance.svg" alt="" className="navbar__icon" />
              <span className="navbar__txt">Баланс</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link">
              <img src="/assets/icons/Profile.svg" alt="" className="navbar__icon" />
              <span className="navbar__txt">Я</span>
            </Link>
          </li>
          <li className="navbar__item" style={{ height: '60%' }}>
            <Link className="navbar__link">
              <img
                src="/assets/icons/More.svg"
                alt=""
                className="navbar__icon"
                style={{ paddingTop: 6 }}
              />
              <span className="navbar__txt">More</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
