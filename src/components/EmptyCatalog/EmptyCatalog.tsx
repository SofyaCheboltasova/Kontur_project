import React from 'react';
import { useTranslation } from 'react-i18next';

import Empty from '../../img/empty.svg';
import styles from './EmptyCatalog.module.css';

interface Props {
  description: string;
}

export const EmptyCatalog = ({ description }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyWrapper}>
      <Empty />
      <span>{t(description)}</span>
    </div>
  );
};
