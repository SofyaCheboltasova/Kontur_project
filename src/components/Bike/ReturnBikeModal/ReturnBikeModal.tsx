import React from 'react';
import { useTranslation } from 'react-i18next';

import stylesModal from './ReturnBikeModal.module.css';
import { Button } from '../../Button';
import { getRentPrice } from '../../../helpers/getRentPrice';
import { convertCurrency } from '../../../helpers/convertCurrency';
export interface ModalProps {
  cost: number;
  bikeImg: string;
  rentTime?: string;
  onClick?: () => void;
}

export const ReturnBikeModal = ({ cost, bikeImg, rentTime, onClick }: ModalProps) => {
  const { t } = useTranslation();
  const bikeCost = convertCurrency(cost);

  return (
    <div className={stylesModal.content}>
      <img className={stylesModal.bikeImg} src={bikeImg} alt="Bike Image" />
      <div>
        <div className={stylesModal.rentTime}>{t('Время аренды')}</div>
        <div className={stylesModal.price}>{rentTime}</div>

        <div className={stylesModal.button}>
          <Button thin onClick={onClick}>
            {t('Сдать велосипед')}
          </Button>
          {rentTime && (
            <div>
              {getRentPrice(bikeCost, rentTime, t)} {t('₽')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
