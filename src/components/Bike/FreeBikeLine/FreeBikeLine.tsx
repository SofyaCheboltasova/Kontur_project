import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './FreeBikeLine.module.css';
import { Button } from '../../Button';
import { Bike } from '../../../api/Api.types';
import { getBikeImagePath } from '../../../helpers/getBikeImgPath';
import { convertCurrency } from '../../../helpers/convertCurrency';
interface BikeProps {
  bike: Bike;
  onClick: (bike: Bike) => void;
}

export const FreeBikeLine = ({ bike, onClick }: BikeProps) => {
  const { t } = useTranslation();
  const bikeImg = getBikeImagePath(bike._id);
  const bikeCost = convertCurrency(bike.cost);

  return (
    <div className={styles.lineBike}>
      <div className={styles.lineBikeInfo} onClick={() => onClick(bike)}>
        <img src={bikeImg} alt={bikeImg} />

        <div className={styles.text}>
          <span className={clsx(styles.header)}>{t(bike.name)}</span>
        </div>

        <span>
          {' '}
          {bikeCost} {t('₽/мин')}
        </span>
        <Button thin className={styles.button} onClick={() => onClick(bike)}>
          {t('Арендовать')}
        </Button>
      </div>
    </div>
  );
};
