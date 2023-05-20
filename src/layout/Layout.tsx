import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Layout.module.css';
import Logo from './img/logo.svg';
import { path } from '../consts/paths';
import { LoginContext } from '../App';
import PeopleIcon from '../img/people.svg';
import EarthBlack from '../img/earthBlack.svg';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { LoginFormData, LoginModal } from '../components/LoginModal/LoginModal';
import { RegistrationFormData, RegistrationModal } from '../components/RegistrationModal/RegistrationModal';
interface LayoutProps {
  onLogin: (login: string, password: string) => Promise<void>;
  onRegister: (login: string, password: string) => Promise<void>;
}

interface LangDropdownProps {
  blue?: boolean;
  handleLanguage: (arg: string) => void;
}

export const LangDropdown = ({ blue, handleLanguage }: LangDropdownProps) => {
  const languageSelection = (language: string) => {
    sessionStorage.setItem('language', language);
    handleLanguage(language);
  };

  return (
    <Dropdown.Wrapper language title={<EarthBlack className={blue ? styles.earthSvg : ''} />}>
      <Dropdown.Item onClick={() => languageSelection('ru')}>Русский</Dropdown.Item>
      <hr className={styles.separator} />
      <Dropdown.Item onClick={() => languageSelection('en')}>English</Dropdown.Item>
      <hr className={styles.separator} />
      <Dropdown.Item onClick={() => languageSelection('ch')}>中文</Dropdown.Item>
    </Dropdown.Wrapper>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onLogin, onRegister }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayRegistration, setDisplayRegistration] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  const { i18n, t } = useTranslation();

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
		console.log(loginData?.login)
  };

  const handleRegister = async (data: RegistrationFormData) => {
    await onRegister(data.email, data.password);
    setDisplayRegistration(false);
  };

  const handleLogin = async (data: LoginFormData) => {
    await onLogin(data.email, data.password);
    setDisplayLogin(false);
  };

  const handleExit = () => {
    setLoginData(null);
  };

  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    if (!loginData?.login && isMounted) {
      navigate(path.home);
    }
    return () => {
      isMounted = false;
    };
  }, [loginData]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <header className={styles.content}>
          <Link to={path.home}>
            <Logo />
          </Link>
          <div className={styles.headerButtons}>
            {!loginData?.login && (
              <>
                <Button onClick={() => setDisplayLogin(true)}>{t('Войти')}</Button>
                <Button light onClick={() => setDisplayRegistration(true)}>
                  {t('Регистрация')}
                </Button>
                <LangDropdown blue handleLanguage={handleLanguage} />
              </>
            )}
            {loginData?.login && (
              <>
                <Link className={styles.books} to={path.booking}>
                  {t('Мои бронирования')}
                </Link>
                <Dropdown.Wrapper
                  title={
                    <span className={styles.login}>
                      <PeopleIcon />
                      &nbsp;
                      {loginData.login || 'Unknown'}
                    </span>
                  }
                >
                  {/* eslint-disable-next-line no-console */}
                  <Link to={path.settings}>
                    <Dropdown.Item>{t('Настройки')}</Dropdown.Item>
                  </Link>
                  <hr className={styles.separator} />
                  <Dropdown.Item onClick={handleExit}>{t('Выход')}</Dropdown.Item>
                </Dropdown.Wrapper>

                <LangDropdown handleLanguage={handleLanguage} />
              </>
            )}
          </div>
          {displayLogin && (
            <LoginModal
              onLogin={handleLogin}
              onClose={() => setDisplayLogin(false)}
              onRegistrClick={() => setDisplayRegistration(true)}
            />
          )}
          {displayRegistration && (
            <RegistrationModal
              onRegister={handleRegister}
              onClose={() => setDisplayRegistration(false)}
              onLoginClick={() => setDisplayLogin(true)}
            />
          )}
        </header>
      </div>

      <div className={styles.main}>{children}</div>
    </div>
  );
};
