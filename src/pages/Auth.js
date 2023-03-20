import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { accounts } from '../store/ArtificialAccounts';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';

const Auth = (props) => {
  const { user } = useContext(Context);
  const [login, setLogin] = useState('');
  const [FIO, setFIO] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isFormValide, setIsFormValide] = useState(false);
  const [valideErrors, setValideErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    props.setAppBarTitle(isLogin ? 'Войти' : 'Регистрация');
    user.setIsAuth(true);
    user.setUser(accounts[0]);
    if (isFormValide) {
      navigate('/main');
    }
  }, [isFormValide]);

  const handleAuth = (e) => {
    if (isLogin) {
      if (
        (login == accounts[0].Login || login == accounts[0].FIO) &&
        password == accounts[0].Password
      ) {
        user.setUser(accounts[0]);
        user.setIsAuth(true);
        navigate('/main');
      }
      setValideErrors({ error: 'Некорректные данные' });
    } else {
      if (login === accounts[0].Login || FIO === accounts[0].FIO) {
        setValideErrors({ error: 'Такой пользователь уже существует' });
        return 0;
      } else if (!handleValidate()) {
        return 0;
      } else {
        accounts[0] = { login: login, FIO: FIO, email: email, phone: phone, password: password };
      }
    }
  };

  const handleValidate = () => {
    if (login == false) {
      setIsFormValide(false);
      setValideErrors({ login: 'Поле "Логин" должно быть заполнено' });
      return isFormValide;
    }
    if (!login.match(/^[a-zA-Z0-9]+$/)) {
      setIsFormValide(false);
      setValideErrors({ login: 'Поле "Логин" не должно содержать не буквенные символы' });
      return isFormValide;
    }
    if (FIO == false) {
      setIsFormValide(false);
      setValideErrors({ FIO: 'Поле "ФИО" должно быть заполнено' });
      return isFormValide;
    }
    if (FIO.length < 8) {
      setIsFormValide(false);
      setValideErrors({ FIO: 'Поле "ФИО" не может быть меньше 8 символов' });
      return isFormValide;
    }
    if (email == false && phone == false) {
      setIsFormValide(false);
      setValideErrors({ email: 'Поле "E-mail" или "Телефон" должно быть заполнено' });
      return isFormValide;
    }
    if (!email.match(/\S+@\S+\.\S+/) && phone == false) {
      setIsFormValide(false);
      setValideErrors({ email: 'Поле "E-mail" не валидно' });
      return isFormValide;
    }
    if (!phone.match(/^[\+][\d\(\)\ -]{4,14}\d$/) && email == false) {
      setIsFormValide(false);
      setValideErrors({ email: 'Поле "Телефон" не валидно' });
      return isFormValide;
    }
    if (password.length < 8) {
      setIsFormValide(false);
      setValideErrors({ password: 'Поле "Пароль" не может быть меньше 8 символов' });
      return isFormValide;
    }
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/)) {
      setIsFormValide(false);
      setValideErrors({
        password: 'Поле "Пароль" должно содержать цифры, большие буквы и символы',
      });
      return isFormValide;
    }
    setValideErrors({});
    setIsFormValide(true);
    return isFormValide;
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
        {isLogin ? 'Войти!' : 'Зарегистрироваться!'}
      </button>
      <Link className="auth__switch" onClick={() => setIsLogin(!isLogin)}>
        Уже есть аккаунт!
      </Link>
      <div className="auth__socials">
        <p>Тут будет стоять регистрация через соц. сети.</p>
      </div>
      <p style={{ color: 'red' }}>{valideErrors.error}</p>
    </div>
  );
};

export default Auth;
