import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import styles from './Main.module.css';
import MapRu from '../../img/map.png';
import MapEng from '../../img/MapEng.png';
import MapCh from '../../img/MapCh.png';
import { Button } from '../../components/Button';
import { path } from '../../consts/paths';
import { LoginContext } from '../../App';
import { LoginModal } from '../../components/LoginModal';
import { RegistrationModal } from '../../components/RegistrationModal';
import { RegistrationFormData } from '../../components/RegistrationModal/RegistrationModal';
import { LoginFormData } from '../../components/LoginModal/LoginModal';

export const Main: React.FC = () => {
  const { loginData, onRegister, onLogin } = useContext(LoginContext);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayRegistration, setDisplayRegistration] = useState(false);
  const { t } = useTranslation();

  const getMapImg = () => {
    switch (i18n.language) {
      case 'ru':
        return <img src={MapRu} alt="map" />;
      case 'en':
        return <img src={MapEng} alt="map" />;
      case 'ch':
        return <img src={MapCh} alt="map" />;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (loginData === null) {
      event.preventDefault();
      setDisplayLogin(true);
    }
  };

  const handleRegister = (data: RegistrationFormData) => {
    onRegister(data.email, data.password);
    setDisplayRegistration(false);
  };

  const handleLogin = (data: LoginFormData) => {
    onLogin(data.email, data.password);
    setDisplayLogin(false);
  };

  return (
    <>
      <section className={styles.landing}>
        <h1 className={styles.title}>{t('Сервис аренды велосипедов')}</h1>
        <p className={styles.subtitle}>{t('bikesCount', { count: 240 })}</p>
        <div className={styles.actions}>
          <Link to={path.catalog} onClick={handleClick}>
            <Button className={styles.button}>{t('Выбрать велосипед')}</Button>
          </Link>
          <a href="#map-page">{t('Пункты проката')}</a>
        </div>
      </section>
      <section className={styles.map}>
        <h2 className={styles.mapTitle} id="map-page">
          {t('Пункты проката')}
        </h2>
        <Link to={path.catalog} onClick={handleClick} className={styles.mapWidget}>
          {getMapImg()}
        </Link>
      </section>

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
    </>
  );
};
