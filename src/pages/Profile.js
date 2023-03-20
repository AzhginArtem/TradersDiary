import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { accounts } from '../store/ArtificialAccounts';
import { Context } from '..';

const Profile = (props) => {
  const { user } = useContext(Context);

  useEffect(() => {
    props.setAppBarTitle('Личный кабинет');
  });
  return (
    <div className="profile">
      <div className="profile__container">
        {Object.keys(user.user).map((key) => {
          return (
            <div className="profile__txt" key={key}>
              <h4 className="profile__header">{key}:&nbsp;</h4>
              <div className="profile__subheader"> {user.user[key]}</div>
            </div>
          );
        })}
      </div>
      <Link to={'/profile/:' + user.Login + '/edit'} className="profile__btn">
        Изменить
      </Link>
    </div>
  );
};

export default Profile;
