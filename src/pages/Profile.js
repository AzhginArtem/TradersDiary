import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { logOut } from '../http/userApi';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const Profile = (props) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    props.setAppBarTitle('Личный кабинет');
  });
  return (
    <div className="profile">
      <div className="profile__container">
        {Object.keys(user.user).map((key) => {
          return key !== 'id' ? (
            <div className="profile__txt" key={key}>
              <h4 className="profile__header">{key}:&nbsp;</h4>
              <div className="profile__subheader"> {user.user[key]}</div>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      <div className="profile__btns">
        <Link to={'/profile/:' + user.user.login + '/edit'} className="profile__btn">
          Изменить
        </Link>
        <p
          className="profile__btn_red"
          onClick={() => {
            logOut();
            user.setIsAuth(false);
            user.setUser({});
            navigate(MAIN_ROUTE);
          }}>
          Выйти
        </p>
      </div>
    </div>
  );
};

export default Profile;
