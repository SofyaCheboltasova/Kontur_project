import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { PasswordInput } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import styles from './Settings.module.css';
import { Label } from '../Label';
import { Button } from '../Button';
import { SettingBlock } from './SettingBlock';
import { validatePassword, vatidateRepeatedPassword } from '../../helpers/validators';

const OLD_PASS_ID = 'setting-old-password';
const NEW_PASS_ID = 'setting-new-password';
const REPEAT_PASS_ID = 'setting-repeat-password';

interface Props {
  onChange: (arg: string) => void;
}

interface passwordRowProps {
  id: string;
  label: string;
  password: string;
  comparePassword?: string;
  setPassword: (arg: string) => void;
  closeSetting?: () => void;
}

const PasswordRow = ({ id, label, password, comparePassword, setPassword, closeSetting }: passwordRowProps) => {
  const { t } = useTranslation();

  let validationInfo;
  if (comparePassword) {
    validationInfo = vatidateRepeatedPassword(password, comparePassword);
  } else {
    validationInfo = validatePassword(password);
  }

  return (
    <div className={styles.settingWrapper}>
      <Label hint htmlFor={id}>
        {t(label)}
      </Label>
      <ValidationWrapper validationInfo={validationInfo}>
        <PasswordInput id={id} width={278} size="medium" value={password} onValueChange={setPassword}></PasswordInput>
      </ValidationWrapper>

      {id === OLD_PASS_ID && (
        <button className={styles.settingButton} onClick={closeSetting}>
          {t('Отменить')}
        </button>
      )}
    </div>
  );
};

export const PasswordSetting = ({ onChange }: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordOpened, setIsPasswordOpened] = useState(false);
  const { t } = useTranslation();

  const handleCancelClick = () => {
    setOldPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setIsPasswordOpened(!isPasswordOpened);
  };

  const validationContainerRef = useRef<ValidationContainer>(null);
  const handleChangeClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) return;

    onChange(newPassword);
    setIsPasswordOpened(!isPasswordOpened);
  };

  return (
    <div>
      <SettingBlock
        type="password"
        label={t('Пароль')}
        openSetting={handleCancelClick}
        isOpened={isPasswordOpened}
      ></SettingBlock>

      <ValidationContainer ref={validationContainerRef}>
        <div className={clsx({ [styles.openedSetting]: !isPasswordOpened })}>
          {PasswordRow({
            id: OLD_PASS_ID,
            label: 'Старый пароль',
            password: oldPassword,
            setPassword: setOldPassword,
            closeSetting: handleCancelClick,
          })}

          {PasswordRow({
            id: NEW_PASS_ID,
            label: 'Новый пароль',
            password: newPassword,
            setPassword: setNewPassword,
          })}

          <div className={styles.hint}>{t('charactersCount', { count: 8 })}</div>

          {PasswordRow({
            id: REPEAT_PASS_ID,
            label: 'Повторите пароль',
            password: repeatPassword,
            comparePassword: newPassword,
            setPassword: setRepeatPassword,
          })}

          <div className={styles.changeButton}>
            <Button onClick={handleChangeClick}>{t('Изменить')}</Button>
          </div>
        </div>
      </ValidationContainer>
    </div>
  );
};
