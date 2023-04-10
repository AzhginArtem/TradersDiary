import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { change } from '../http/userApi';

const ProfileChange = (props) => {
  const { user } = useContext(Context);
  const [loginInp, setLogin] = useState('');
  const [FIO, setFIO] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [valideErrors, setValideErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    props.setAppBarTitle('Изменить данные');
  }, []);

  const handleAuth = async (e) => {
    if (handleValidate()) {
      try {
        let data = await change(FIO, loginInp, password, email, phone, user.user.id);
        delete data.exp;
        delete data.iat;
        user.setUser(data);
        console.log(data);
      } catch (err) {
        setValideErrors({ error: err.response.data.message });
      }
    }
  };

  const handleValidate = () => {
    if (isLogin) {
      if (loginInp == false) {
        setValideErrors({ login: 'Поле "Логин" должно быть заполнено' });
        return false;
      }
      if (!loginInp.match(/^[a-zA-Z0-9]+$/)) {
        setValideErrors({ login: 'Поле "Логин" не должно содержать не буквенные символы' });
        return false;
      }
      if (password.length < 8) {
        setValideErrors({ password: 'Поле "Пароль" не может быть меньше 8 символов' });
        return false;
      }
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/)) {
        setValideErrors({
          password: 'Поле "Пароль" должно содержать цифры, большие буквы и символы',
        });
        return false;
      }
    } else {
      if (loginInp == false) {
        setValideErrors({ login: 'Поле "Логин" должно быть заполнено' });
        return false;
      }
      if (!loginInp.match(/^[a-zA-Z0-9]+$/)) {
        setValideErrors({ login: 'Поле "Логин" не должно содержать не буквенные символы' });
        return false;
      }
      if (FIO == false) {
        setValideErrors({ FIO: 'Поле "ФИО" должно быть заполнено' });
        return false;
      }
      if (FIO.length < 8) {
        setValideErrors({ FIO: 'Поле "ФИО" не может быть меньше 8 символов' });
        return false;
      }
      if (email == false && phone == false) {
        setValideErrors({ email: 'Поле "E-mail" или "Телефон" должно быть заполнено' });
        return false;
      }
      if (!email.match(/\S+@\S+\.\S+/) && phone == false) {
        setValideErrors({ email: 'Поле "E-mail" не валидно' });
        return false;
      }
      if (!phone.match(/^[\+][\d\(\)\ -]{4,14}\d$/) && email == false) {
        setValideErrors({ email: 'Поле "Телефон" не валидно' });
        return false;
      }
      if (password.length < 8) {
        setValideErrors({ password: 'Поле "Пароль" не может быть меньше 8 символов' });
        return false;
      }
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/)) {
        setValideErrors({
          password: 'Поле "Пароль" должно содержать цифры, большие буквы и символы',
        });
        return false;
      }
    }
    setValideErrors({});
    return true;
  };

  return (
    <div className="auth">
      <form className="auth__form">
        <div className="auth__block">
          <label htmlFor="login" className="auth__label">
            Введите логин:
          </label>
          <input
            type="text"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            id="login"
            className="auth__input"
            required
          />
          <p style={{ color: 'red' }}>{valideErrors.login}</p>
        </div>
        <div className="auth__block" style={{ display: isLogin ? 'none' : 'block' }}>
          <label htmlFor="FIO" className="auth__label">
            Введите ФИО:
          </label>
          <input
            type="text"
            id="FIO"
            onChange={(e) => setFIO(e.target.value)}
            className="auth__input"
          />
          <p style={{ color: 'red' }}>{valideErrors.FIO}</p>
        </div>
        <div className="auth__block" style={{ display: isLogin ? 'none' : 'block' }}>
          <label htmlFor="email" className="auth__label">
            Введите E-mail:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="auth__input"
          />
        </div>
        <div className="auth__block" style={{ display: isLogin ? 'none' : 'block' }}>
          <label htmlFor="phone" className="auth__label">
            Введите телефон:
          </label>
          <input
            type="tel"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            className="auth__input"
          />
          <p style={{ color: 'red' }}>{valideErrors.email}</p>
        </div>
        <div className="auth__block">
          <label htmlFor="password" className="auth__label">
            Введите пароль:
          </label>
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="auth__input"
          />
          <p style={{ color: 'red' }}>{valideErrors.password}</p>
        </div>
      </form>
      <button
        onClick={(e) => {
          handleAuth(e);
        }}
        className="auth__btn">
        {'Сохранить'}
      </button>
      <p style={{ color: 'red' }}>{valideErrors.error}</p>
    </div>
  );
};

export default ProfileChange;
