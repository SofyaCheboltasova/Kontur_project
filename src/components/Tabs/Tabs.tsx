import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Tabs.module.css';
import { MapModal } from '../MapModal';
import Dots from '../../img/dots.svg';
import Bars from '../../img/bars.svg';
import Map from '../../img/map.svg';
import { RentPoint } from '../../api/Api.types';

interface TabsProps {
  streetsList: RentPoint[];
  bikesNumber: number;
  onViewChange: (view: string) => void;
  paramQueryName?: string;
}

export const Tabs = ({ streetsList, bikesNumber, onViewChange, paramQueryName = 'pointId' }: TabsProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [dotsActive, setDotsActive] = useState(true);
  const { t } = useTranslation();

  const pageQueryName = 'page';

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  const handleDotsClick = () => {
    onViewChange('dots');
    setDotsActive(true);
  };

  const handleLinesClick = () => {
    onViewChange('lines');
    setDotsActive(false);
  };

  const [searchParams, updateSearchParams] = useSearchParams();
  const currentPoint = useMemo(() => {
    const candidate = searchParams.get(paramQueryName);
    return candidate ? String(candidate) : null;
  }, [searchParams]);

  const handlePointChange = (value: string) => {
    searchParams.set(paramQueryName, value.toString());
    searchParams.set(pageQueryName, '1');
    updateSearchParams(searchParams);
  };

  return (
    <div className={styles.tabsWrapper}>
      <section className={styles.tabs}>
        {streetsList.map((street) => (
          <div
            key={street._id}
            className={clsx(styles.tabsLink, { [styles.tabsLinkActive]: street._id === currentPoint })}
            onClick={() => handlePointChange(street._id)}
          >
            {t(street.address)}
          </div>
        ))}
        <div
          className={clsx(styles.tabsLink, { [styles.tabsLinkActive]: null === currentPoint })}
          onClick={() => handlePointChange('')}
        >
          {t('Все пункты')}
        </div>
      </section>

      <div className={styles.tabsLinks}>
        <div className={clsx(styles.tabsMap, styles.dropdownRef)} onClick={handleModal}>
          {modalActive && <MapModal />}
          <Map />
          <span>{t('На карте')}</span>
        </div>

        <div
          className={clsx(styles.link, styles.tabsIcons, { [styles.tabsIconsActive]: dotsActive })}
          onClick={handleDotsClick}
        >
          <Dots />
        </div>
        <div
          className={clsx(styles.link, styles.tabsIcons, { [styles.tabsIconsActive]: !dotsActive })}
          onClick={handleLinesClick}
        >
          <Bars />
        </div>
        <span className={styles.tabsText}>
          {bikesNumber} {t('велосипедов')}
        </span>
      </div>
    </div>
  );
};
