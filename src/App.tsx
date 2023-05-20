import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import classes from './App.module.css';
import { api } from './api';
import { Layout } from './layout';
import { Router } from './Router';
import { UserData } from './api/Api.types';

export const LoginContext = createContext<{
  loginData: null | UserData;
  setLoginData: (loginData: null | UserData) => void;
  onRegister: (login: string, password: string) => void;
  onLogin: (login: string, password: string) => void;
}>({
  loginData: null,
  setLoginData: () => {
    return null;
  },
  onRegister: () => {
    return null;
  },
  onLogin: () => {
    return null;
  },
});

export const App = () => {
  const [userData, setUserData] = useState<null | UserData>(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentUser = async () => {
    setLoading(true);
    const data = await api.user.getCurrentUser();

    if (data?.login) {
      setUserData({ login: data.login, cardRequisites: data.cardRequisites });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const onRegister = async (login: string, password: string) => {
    await api.user.register(login, password);
    loadCurrentUser();
  };

  const onLogin = async (login: string, password: string) => {
    const status = await api.user.login(login, password);

		if(status.statusCode === 401){
			return;
		}
		
    loadCurrentUser();
  };

  if (loading) {
    return <div className={classes.loader}>Загружаем сервис...</div>;
  }

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loginData: userData, setLoginData: setUserData, onRegister: onRegister, onLogin: onLogin }}
      >
        <Layout onRegister={onRegister} onLogin={onLogin}>
          <Router />
        </Layout>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};
