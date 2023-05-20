import React from 'react';
import { clsx } from 'clsx';

import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  light?: boolean;
  wide?: boolean;
  large?: boolean;
  link?: boolean;
  thin?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  className,
  onClick,
  link,
  children,
  light,
  wide,
  large,
  thin,
}) => {
  const handleClick = () => {
    if (disabled || !onClick) {
      return;
    }
    onClick();
  };

  return (
    <button
      className={clsx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.light]: light,
        [styles.wide]: wide,
        [styles.large]: large,
        [styles.link]: link,
        [styles.thin]: thin,
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
