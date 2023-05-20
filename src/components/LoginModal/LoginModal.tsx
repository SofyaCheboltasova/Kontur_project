import React, { useRef, useState } from 'react';
import { Input, PasswordInput } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import { Row } from '../Form';
import { Modal } from '../Modal';
import { Label } from '../Label';
import { Button } from '../Button';
import { validateEmail, validatePassword } from '../../helpers/validators';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  onClose: () => void;
  onRegistrClick: () => void;
}

export const LoginModal = ({ onLogin, onClose, onRegistrClick }: Props) => {
  const { t } = useTranslation();
  const validationContainerRef = useRef<ValidationContainer>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormInvalid = () => {
    return email === '' || password === '';
  };

  const handleLoginClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onLogin({ email, password });
  };

  const handleRegisterClick = () => {
    onClose();
    onRegistrClick();
  };

  return (
    <Modal width={456} title={t('Вход')} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Row>
          <Label htmlFor="login-email">{t('Электронная почта')}</Label>
          <ValidationWrapper validationInfo={validateEmail(email)}>
            <Input width={360} size="large" id="login-email" value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </Row>
        <Row>
          <Label htmlFor="login-password">{t('Пароль')}</Label>
          <ValidationWrapper validationInfo={validatePassword(password)}>
            <PasswordInput width={360} size="large" value={password} id="login-password" onValueChange={setPassword} />
          </ValidationWrapper>
        </Row>
        <Row button>
          <Button disabled={isFormInvalid()} wide large onClick={handleLoginClick}>
            {t('Войти')}
          </Button>
        </Row>
        <Row center>
          <Button link onClick={handleRegisterClick}>
            {t('Зарегистрироваться')}
          </Button>
        </Row>
      </ValidationContainer>
    </Modal>
  );
};
