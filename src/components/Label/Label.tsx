import React from 'react';
import { clsx } from 'clsx';

import styles from './Label.module.css';

interface Props {
  hint?: boolean;
  warning?: boolean;
  error?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export const Label = ({ hint, warning, error, htmlFor, children }: Props) => {
  return (
    <label
      className={clsx(styles.label, {
        [styles.hint]: hint,
        [styles.warning]: warning,
        [styles.error]: error,
      })}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
