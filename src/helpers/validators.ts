import { ValidationInfo } from '@skbkontur/react-ui-validations';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cardNumberRegExp = /^\d{4}\d{4}\d{4}\d{4}$/;
const CVVNumberRegExp = /^\d{3}$/;
const cardDateRegExp = /^0[1-9]|1[0-2]\/[22-99]/;

export const validateEmail = (value: string): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите адрес электронной почты',
      type: 'submit',
    };
  }

  if (!emailRegExp.test(value)) {
    return {
      message: 'Проверьте правильность введенной электронной почты',
      type: 'lostfocus',
    };
  }

  return null;
};

export const validatePassword = (value: string): ValidationInfo | null => {
  const minLength = 8;
  if (!value) {
    return {
      message: 'Введите пароль',
      type: 'submit',
    };
  }

  if (value.length < minLength) {
    return {
      message: `Минимальная длина пароля ${minLength} символов`,
      type: 'lostfocus',
    };
  }

  return null;
};

export const vatidateRepeatedPassword = (value: string, repeatedPassword: string): ValidationInfo | null => {
  const validation = validatePassword(value);

  if (validation) {
    return validation;
  }

  if (value !== repeatedPassword) {
    return {
      message: 'Пароли не совпадают',
      type: 'lostfocus',
    };
  }

  return null;
};

export const validateCardNumber = (value: string): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите номер вашей карты',
      type: 'submit',
    };
  }

  if (!cardNumberRegExp.test(value)) {
    return {
      message: 'Проверьте правильность введенного номера карты',
      type: 'lostfocus',
    };
  }

  return null;
};

export const validateCardCVV = (value: string): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите CVV кода вашей карты',
      type: 'submit',
    };
  }

  if (!CVVNumberRegExp.test(value)) {
    return {
      message: 'Проверьте правильность введенного CVV кода карты',
      type: 'lostfocus',
    };
  }

  return null;
};

export const validateCardDate = (value: string): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите дату окончания вашей карты',
      type: 'submit',
    };
  }

  if (!cardDateRegExp.test(value)) {
    return {
      message: 'Проверьте правильность введенной даты окончания карты',
      type: 'lostfocus',
    };
  }

  return null;
};
