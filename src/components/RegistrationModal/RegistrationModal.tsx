import React, { useRef, useState } from 'react';
import { Input, PasswordInput } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useTranslation } from 'react-i18next';

import styles from '../Modal/Modal.module.css';
import { Modal } from '../Modal';
import { Label } from '../Label';
import { Button } from '../Button';
import { Form, Row } from '../Form';
import { validateEmail, validatePassword, vatidateRepeatedPassword } from '../../helpers/validators';

interface RegistrationFormState {
  email: string;
  password1: string;
  password2: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
}

interface Props {
  onClose: () => void;
  onLoginClick: () => void;
  onRegister: (data: RegistrationFormData) => void;
}

export const RegistrationModal = ({ onClose, onRegister, onLoginClick }: Props) => {
  const { t } = useTranslation();

  const [state, setState] = useState<RegistrationFormState>({
    email: '',
    password1: '',
    password2: '',
  });
  const validationContainerRef = useRef<ValidationContainer>(null);

  const getFieldSetter = (field: keyof RegistrationFormState) => {
    return (value: string) => {
      setState({ ...state, [field]: value });
    };
  };

  const isFormInvalid = () => {
    return state.email === '' || state.password1 === '' || state.password2 === '';
  };

  const handleRegisterClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onRegister({
      email: state.email,
      password: state.password1,
    });
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  return (
    <Modal width={456} title={t('Регистрация')} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Form>
          <Row>
            <Label htmlFor="reg-email">{t('Электронная почта')}</Label>
            <ValidationWrapper validationInfo={validateEmail(state.email)}>
              <Input
                width={360}
                size="large"
                id="reg-email"
                value={state.email}
                onValueChange={getFieldSetter('email')}
              />
            </ValidationWrapper>
          </Row>
          <Row>
            <Label htmlFor="reg-password1">{t('Пароль')}</Label>
            <ValidationWrapper validationInfo={validatePassword(state.password1)}>
              <PasswordInput
                width={360}
                size="large"
                id="reg-password1"
                value={state.password1}
                onValueChange={getFieldSetter('password1')}
              />
            </ValidationWrapper>
            <div className={styles.hint}>{t('Минимум символов', { count: 8 })}</div>
          </Row>
          <Row>
            <Label htmlFor="reg-password2">{t('Повторите пароль')}</Label>
            <ValidationWrapper validationInfo={vatidateRepeatedPassword(state.password2, state.password1)}>
              <PasswordInput
                width={360}
                size="large"
                id="reg-password2"
                value={state.password2}
                onValueChange={getFieldSetter('password2')}
              />
            </ValidationWrapper>
          </Row>
          <Row button>
            <Button disabled={isFormInvalid()} wide large onClick={handleRegisterClick}>
              {t('Зарегистрироваться')}
            </Button>
          </Row>
          <Row center>
            <Button link onClick={handleLoginClick}>
              {t('Войти')}
            </Button>
          </Row>
        </Form>
      </ValidationContainer>
    </Modal>
  );
};
