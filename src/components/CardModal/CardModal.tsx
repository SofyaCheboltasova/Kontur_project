import React, { useRef, useState } from 'react';
import { Gapped, Input, PasswordInput } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import { Row } from '../Form';
import { Modal } from '../Modal';
import { Label } from '../Label';
import { Button } from '../Button';
import { CardRequisites } from '../../api/Api.types';
import { validateCardCVV, validateCardDate, validateCardNumber } from '../../helpers/validators';

interface Props {
  onAddCard: (data: CardRequisites) => void;
  onClose: () => void;
  onAddCardLater: () => void;
}

export const CardModal = ({ onAddCard, onClose, onAddCardLater }: Props) => {
  const { t } = useTranslation();

  const validationContainerRef = useRef<ValidationContainer>(null);
  const [number, setCard] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');

  const isFormInvalid = () => {
    return number === '' || date === '' || cvv === '';
  };

  const handleLoginClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onAddCard({ number, date, cvv });
  };

  const handleLaterClick = () => {
    onClose();
    onAddCardLater();
  };

  return (
    <Modal width={456} title={t('Реквизиты карты')} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Row>
          <Label htmlFor="login-card">{t('Номер карты')}</Label>
          <ValidationWrapper validationInfo={validateCardNumber(number)}>
            <Input
              width={360}
              size="large"
              value={number}
              id="login-card"
              onValueChange={setCard}
              placeholder="0000 0000 0000 0000"
            />
          </ValidationWrapper>
        </Row>
        <Gapped gap={26}>
          <Row>
            <Label htmlFor="login-date">{t('Срок')}</Label>
            <ValidationWrapper validationInfo={validateCardDate(date)}>
              <Input
                id="date"
                width={166}
                size="large"
                value={date}
                mask="99/99"
                placeholder="MM/ГГ"
                onValueChange={setDate}
              />
            </ValidationWrapper>
          </Row>

          <Row>
            <Label htmlFor="login-cvv">{t('Срок')}</Label>
            <ValidationWrapper validationInfo={validateCardCVV(cvv)}>
              <PasswordInput
                width={166}
                value={cvv}
                size="large"
                id="login-cvv"
                placeholder="•••"
                onValueChange={setCvv}
              />
            </ValidationWrapper>
          </Row>
        </Gapped>
        <Row button>
          <Button disabled={isFormInvalid()} wide large onClick={handleLoginClick}>
            {t('Привязать карту')}
          </Button>
        </Row>
        <Row center>
          <Button link onClick={handleLaterClick}>
            {t('Привязать потом')}
          </Button>
        </Row>
      </ValidationContainer>
    </Modal>
  );
};
