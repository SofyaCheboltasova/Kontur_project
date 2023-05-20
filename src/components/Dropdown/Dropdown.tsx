import React from 'react';
import clsx from 'clsx';

import styles from './Dropdown.module.css';

interface WrapperProps {
  title: React.ReactNode;
  children: React.ReactNode;
  language?: boolean;
}

const Wrapper = ({ title, children, language }: WrapperProps) => {
  return (
    <div className={clsx(styles.dropdown, { [styles.language]: language })} tabIndex={0}>
      <div className={styles.title}>{title}</div>
      <div className={styles.menu}>{children}</div>
    </div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Item = ({ children, onClick }: ItemProps) => {
  return (
    <div className={styles.item} onClick={onClick}>
      {children}
    </div>
  );
};

export const Dropdown = { Wrapper, Item };
