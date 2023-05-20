import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './Settings.module.css';
import { Label } from '../Label';
import Visa from '../../img/visa.svg';

export interface SettingBlockProps {
  type: 'email' | 'password' | 'card';
  label: string;
  userInfo?: string;
  isOpened: boolean;
  openSetting: () => void;
}

export const SettingBlock = ({ type, label, userInfo, isOpened, openSetting }: SettingBlockProps) => {
  const { t } = useTranslation();

  let maskedUserInfo = userInfo;

  if (type === 'card' && userInfo && userInfo.length === 16) {
    maskedUserInfo = `•••• •••• •••• ${userInfo.slice(-4)}`;
  }
  return (
    <div className={clsx(styles.settingWrapper, { [styles.openedSetting]: isOpened })}>
      <Label hint>{label}</Label>
      <div className={styles.card}>
        {type === 'card' && <Visa />}
        <div>{maskedUserInfo}</div>
      </div>
      <button className={styles.settingButton} onClick={openSetting}>
        {t('Изменить')}
      </button>
    </div>
  );
};
