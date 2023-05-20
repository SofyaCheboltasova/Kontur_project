import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DateRangeModal.module.css';
import { stringToDate } from '../../../helpers/stringToDate';
import { getRentPrice } from '../../../helpers/getRentPrice';
import { Order } from '../../../api/Api.types';
import { convertCurrency } from '../../../helpers/convertCurrency';

export interface ModalProps {
  cost: number;
  bikeImg: string;
  rentTime: string;
  order: Order;
}

export const DateRangeModal = ({ cost, bikeImg, rentTime, order }: ModalProps) => {
  const { t } = useTranslation();
  const bikeCost = convertCurrency(cost);

  if (!order.start || !order.end) {
    return null;
  }

  const convertedDate = stringToDate(order.start, order.end);
  const curRentPrice = getRentPrice(bikeCost, rentTime, t);

  return (
    <div className={styles.content}>
      <img className={styles.bikeImg} src={bikeImg} alt="Bike Image" />
      <div>
        <div className={styles.date}>{convertedDate}</div>
        <div className={styles.price}>
          {curRentPrice} {t('₽')}
        </div>
      </div>
    </div>
  );
};
