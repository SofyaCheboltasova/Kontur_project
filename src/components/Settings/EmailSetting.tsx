import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Input } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import styles from './Settings.module.css';
import { Label } from '../Label';
import { Button } from '../Button';
import { SettingBlock } from './SettingBlock';
import { validateEmail } from '../../helpers/validators';

interface Props {
  userInfo: string;
  onChange: (arg: string) => void;
}

export const EmailSetting = ({ userInfo, onChange }: Props) => {
  const [email, setEmail] = useState(userInfo);
  const [isEmailOpened, setIsEmailOpened] = useState(false);
  const { t } = useTranslation();

  const onCancelClick = () => {
    setEmail(userInfo);
    setIsEmailOpened(!isEmailOpened);
  };

  const validationContainerRef = useRef<ValidationContainer>(null);
  const onChangeClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());
    if (!isValid) return;

    onChange(email);
    setIsEmailOpened(!isEmailOpened);
  };

  return (
    <div>
      <SettingBlock
        type="email"
        userInfo={email}
        isOpened={isEmailOpened}
        label={t('Электронная почта')}
        openSetting={onCancelClick}
      ></SettingBlock>

      <ValidationContainer ref={validationContainerRef}>
        <div className={clsx({ [styles.openedSetting]: !isEmailOpened })}>
          <div className={styles.settingWrapper}>
            <Label hint>{t('Электронная почта')}</Label>

            <ValidationWrapper validationInfo={validateEmail(email)}>
              <Input width={278} value={email} size="medium" id="setting-email" onValueChange={setEmail} />
            </ValidationWrapper>

            <button className={styles.settingButton} onClick={onCancelClick}>
              {t('Отменить')}
            </button>
          </div>

          <div className={styles.changeButton}>
            <Button onClick={onChangeClick}>{t('Изменить')}</Button>
          </div>
        </div>
      </ValidationContainer>
    </div>
  );
};
