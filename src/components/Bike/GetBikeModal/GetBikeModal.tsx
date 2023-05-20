import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../FreeBikeModal/FreeBikeModal.module.css';
import { Button } from '../../Button';
import { convertCurrency } from '../../../helpers/convertCurrency';

export interface ModalProps {
  cost: number;
  bikeImg: string;
  onClick: () => void;
}

export const GetBikeModal = ({ cost, bikeImg, onClick }: ModalProps) => {
  const { t } = useTranslation();
  const bikeCost = convertCurrency(cost);

  return (
    <div className={styles.content}>
      <img src={bikeImg} alt="Bike Image" />

      <div className={styles.info}>
        <div className={styles.price}>
          {bikeCost} {t('₽/мин')}
        </div>
        <Button thin wide onClick={onClick}>
          {t('Арендовать')}
        </Button>
      </div>
    </div>
  );
};
