import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsComponent } from '../../components/Settings';
import { UserData } from '../../api/Api.types';
import { api } from '../../api';
import styles from './Settings.module.css';

export const Settings: React.FC = () => {
  const [userData, setUserData] = useState<UserData>();
  const { t } = useTranslation();

  useEffect(() => {
    api.user.getCurrentUser().then((user) => {
      setUserData(user);
    });
  });

  return (
    <div>
      <h2 className={styles.title}>{t('Настройки')}</h2>
      {userData && <SettingsComponent userData={userData} />}
    </div>
  );
};
