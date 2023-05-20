import React from 'react';
import { clsx } from 'clsx';

import Close from '../../img/close.svg';
import styles from './Modal.module.css';
import { useTranslation } from 'react-i18next';

export interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width: React.CSSProperties['width'];
}

export const Modal: React.FC<Props> = ({ width, title, onClose, children }: Props) => {
  const { t } = useTranslation();

  const isTitleLong = title.length > 32;
  return (
    <div className={clsx(styles.modal, { [styles.modalActive]: true })} id="modal-card">
      <div className={styles.background} onClick={onClose}></div>
      <div style={{ width }} className={styles.content}>
        <header className={styles.title}>
          <h2 className={clsx({ [styles.longTitle]: isTitleLong })}>{t(title)}</h2>
          <div className={styles.close} onClick={onClose}>
            <Close />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};
