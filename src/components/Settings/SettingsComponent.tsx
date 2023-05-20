import React, { useState } from 'react';

import styles from './Settings.module.css';
import { EmailSetting } from './EmailSetting';
import { PasswordSetting } from './PasswordSetting';
import { CardSetting } from './CardSetting';
import { UserData } from '../../api/Api.types';
import { api } from '../../api';

interface Props {
  userData: UserData;
}

export const SettingsComponent = ({ userData }: Props) => {
  const [email, setEmail] = useState(userData.login);
  const [password, setPassword] = useState('');
  const [card, setCard] = useState(userData.cardRequisites?.number);
  const [date, setDate] = useState(userData.cardRequisites?.date);
  const [cvv, setCvv] = useState(userData.cardRequisites?.cvv);

  const handleNewEmail = async (newEmail: string) => {
    setEmail(newEmail);
    await api.user.updateUserInfo({ login: newEmail });
  };

  const handleNewCardRequisites = async (newCard: string, newDate: string, newCvv: string) => {
    setCard(newCard);
    setDate(newDate);
    setCvv(newCvv);

    await api.user.updateUserInfo({ cardRequisites: { number: newCard, date: newDate, cvv: newCvv } });
  };

  const handleNewPassword = async (newPassword: string) => {
    setPassword(newPassword);
    await api.user.updateUserInfo({ password: newPassword });
  };

  return (
    <div>
      <EmailSetting userInfo={email} onChange={handleNewEmail}></EmailSetting>

      <div className={styles.line}></div>

      <PasswordSetting onChange={handleNewPassword}></PasswordSetting>

      <div className={styles.line}></div>

      {card && date && cvv && (
        <CardSetting userCard={{ number: card, date: date, cvv: cvv }} onChange={handleNewCardRequisites} />
      )}

      {(!card || !date || !cvv) && <CardSetting userCard={undefined} onChange={handleNewCardRequisites} />}
    </div>
  );
};
