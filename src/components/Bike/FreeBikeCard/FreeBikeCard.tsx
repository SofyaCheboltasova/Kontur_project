import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './FreeBikeCard.module.css';
import { Bike } from '../../../api/Api.types';
import { Button } from '../../Button';
import { getBikeImagePath } from '../../../helpers/getBikeImgPath';
import { convertCurrency } from '../../../helpers/convertCurrency';

interface BikeProps {
  bike: Bike;
  isBooked: boolean;
  onClick: (bike: Bike) => void;
}

export const FreeBikeCard = ({ bike, isBooked, onClick }: BikeProps) => {
  const { t } = useTranslation();
  const bikeImg = getBikeImagePath(bike._id);
  const bikeCost = convertCurrency(bike.cost);

  return (
    <div className={clsx(styles.cardBike, { [styles.bookedCardBike]: isBooked })}>
      <div className={styles.cardBikeInfo} onClick={() => onClick(bike)}>
        <img src={bikeImg} alt={bikeImg} />

        <div className={styles.cardText}>
          <span className={styles.cardHeader}>{t(bike.name)}</span>
          <span>
            {bikeCost} {t('₽/мин')}
          </span>
        </div>
      </div>
      {!isBooked && (
        <Button thin className={styles.button} onClick={() => onClick(bike)}>
          {t('Арендовать')}
        </Button>
      )}
    </div>
  );
};
