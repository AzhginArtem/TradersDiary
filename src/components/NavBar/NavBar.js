import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './NavBar.sass';
import HomeImage from '../../icons/Home.svg';
import BalanceImage from '../../icons/Balance.svg';
import ProfileImage from '../../icons/Profile.svg';
import MoreImage from '../../icons/More.svg';
import { Context } from '../../index';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    !user.isAuth || (
      <div className="navbar">
        <nav className="navbar__nav">
          <ul className="navbar__menu">
            <li className="navbar__item">
              <Link to={user.isAuth ? '/main' : '/'} className="navbar__link">
                <img src={HomeImage} alt="" className="navbar__icon" />
                <span className="navbar__txt">Сделки</span>
              </Link>
            </li>
            <li className="navbar__item">
              <Link className="navbar__link">
                <img src={BalanceImage} alt="" className="navbar__icon" />
                <span className="navbar__txt">Баланс</span>
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to={user.isAuth ? '/profile/:' + user.user.login : '/'}
                className="navbar__link">
                <img src={ProfileImage} alt="" className="navbar__icon" />
                <span className="navbar__txt">Я</span>
              </Link>
            </li>
            <li className="navbar__item" style={{ height: '60%' }}>
              <Link to={user.isAuth ? '/deposit' : '/'} className="navbar__link">
                <img src={MoreImage} alt="" className="navbar__icon" style={{ paddingTop: 6 }} />
                <span className="navbar__txt">More</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
});

export default NavBar;
