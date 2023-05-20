import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Input, PasswordInput } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import styles from './Settings.module.css';
import { Label } from '../Label';
import { Button } from '../Button';
import { SettingBlock } from './SettingBlock';
import { CardRequisites } from '../../api/Api.types';
import { validateCardCVV, validateCardDate, validateCardNumber } from '../../helpers/validators';

const CARD_ID = 'setting-card';
const DATE_ID = 'setting-date';
const CVV_ID = 'setting-cvv';
interface Props {
  userCard: CardRequisites | undefined;
  onChange: (card: string, date: string, cvv: string) => void;
}

export const CardSetting = ({ userCard, onChange }: Props) => {
  const [card, setCard] = useState(userCard ? userCard.number : '');
  const [date, setDate] = useState(userCard ? userCard.date : '');
  const [cvv, setCvv] = useState(userCard ? userCard.cvv : '');
  const [isCardOpened, setIsCardOpened] = useState(false);
  const { t } = useTranslation();

  const onCancelClick = () => {
    setDate(userCard ? userCard.date : '');
    setCvv(userCard ? userCard.cvv : '');
    setIsCardOpened(!isCardOpened);

    setCard(userCard ? userCard.number : '');
  };

  const validationContainerRef = useRef<ValidationContainer>(null);
  const onChangeClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) return;

    onChange(card, date, cvv);
    setIsCardOpened(!isCardOpened);
  };

  return (
    <div>
      <SettingBlock
        type="card"
        label={t('Карта')}
        userInfo={card}
        isOpened={isCardOpened}
        openSetting={onCancelClick}
      ></SettingBlock>

      <ValidationContainer ref={validationContainerRef}>
        <div className={clsx({ [styles.openedSetting]: !isCardOpened })}>
          <div className={clsx(styles.settingWrapper)}>
            <Label hint htmlFor={CARD_ID}>
              {t('Карта')}
            </Label>
            <ValidationWrapper validationInfo={validateCardNumber(card)}>
              <Input
                width={278}
                size="medium"
                id={CARD_ID}
                value={card}
                placeholder="0000 0000 0000 0000"
                onValueChange={setCard}
              ></Input>
            </ValidationWrapper>
            <button className={styles.settingButton} onClick={onCancelClick}>
              {t('Отменить')}
            </button>
          </div>

          <div className={clsx(styles.settingWrapper)}>
            <Label hint htmlFor={DATE_ID}>
              {t('Срок')}
            </Label>
            <ValidationWrapper validationInfo={validateCardDate(date)}>
              <Input
                width={142}
                size="medium"
                value={date}
                mask="99/99"
                placeholder="MM/ГГ"
                onValueChange={setDate}
              ></Input>
            </ValidationWrapper>
          </div>

          <div className={clsx(styles.settingWrapper)}>
            <Label hint htmlFor={CVV_ID}>
              {t('CVV')}
            </Label>
            <ValidationWrapper validationInfo={validateCardCVV(cvv)}>
              <PasswordInput
                width={142}
                size="medium"
                id={CVV_ID}
                value={cvv}
                placeholder="•••"
                onValueChange={setCvv}
              ></PasswordInput>
            </ValidationWrapper>
          </div>

          <div className={styles.changeButton}>
            <Button onClick={onChangeClick}>{t('Изменить')}</Button>
          </div>
        </div>
      </ValidationContainer>
    </div>
  );
};
