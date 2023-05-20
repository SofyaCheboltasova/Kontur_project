import React, { useState } from 'react';
import clsx from 'clsx';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import styles from '../../Modal/Modal.module.css';
import MapRu from '../../../img/map.png';
import MapEng from '../../../img/MapEng.png';
import MapCh from '../../../img/MapCh.png';
import Close from '../../../img/close.svg';
import { Button } from '../../Button';
import { Bike } from '../../../api/Api.types';
import { convertCurrency } from '../../../helpers/convertCurrency';

interface RentedModalProps {
  bike: Bike;
  isMapOpened?: boolean;
  onClose: () => void;
  isRented?: boolean;
  children: React.ReactNode;
}

export const RentedModal = ({ bike, isMapOpened, isRented = true, children, onClose }: RentedModalProps) => {
  const { t } = useTranslation();
  const bikeCost = convertCurrency(bike.cost);

  const getMapImg = () => {
    switch (i18n.language) {
      case 'ru':
        return <img src={MapRu} alt="map" />;
      case 'en':
        return <img src={MapEng} alt="map" />;
      case 'ch':
        return <img src={MapCh} alt="map" />;
    }
  };

  const [modalActive, setModalActive] = useState(true);
  const handleClose = () => {
    setModalActive(!modalActive);
    onClose();
  };

  const isTitleLong = bike.name.length > 27;

  return (
    <div className={clsx(styles.modal, { [styles.modalActive]: modalActive })}>
      <div className={styles.background} onClick={handleClose}></div>

      <div className={styles.content}>
        <header className={styles.title}>
          <div className={styles.titleButton}>
            <h2 className={clsx({ [styles.longTitle]: isTitleLong })}>{t(bike.name)}</h2>
            {isRented && (
              <Button disabled>
                {bikeCost} {t('₽/мин')}
              </Button>
            )}
          </div>

          <div className={styles.close} onClick={handleClose}>
            <Close />
          </div>
        </header>

        {children}

        <div className={clsx(styles.point, { [styles.pointClose]: !isMapOpened })}>
          <span>{t('Пункт проката')}</span>
          {getMapImg()}
        </div>
      </div>
    </div>
  );
};
