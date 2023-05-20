import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { api } from '../../api';
import styles from './Catalog.module.css';
import { Tabs } from '../../components/Tabs';
import { Paging } from '../../components/Paging';
import { FreeBikeCard } from '../../components/Bike/FreeBikeCard';
import { FreeBikeLine } from '../../components/Bike/FreeBikeLine';
import { Bike, Pagination, RentPoint } from '../../api/Api.types';
import { Footer } from '../../components/Footer';
import { EmptyCatalog } from '../../components/EmptyCatalog';
import { FreeBikeModal } from '../../components/Bike/FreeBikeModal';

const pageQueryName = 'page';
const pointIdQueryName = 'pointId';

export const Catalog: React.FC = () => {
  const [view, setView] = useState('dots');
  const [searchParams] = useSearchParams();
  const [streetsList, setStreetsList] = useState<RentPoint[]>([]);
  const [bikesList, setBikesList] = useState<Pagination<Bike>>();
  const [openedBikeModal, setOpenedBikeModal] = useState<null | Bike>(null);
  const { t } = useTranslation();

  const isFullCatalog = bikesList !== undefined && bikesList?.totalItems !== 0;

  const currentPage = Number(searchParams.get(pageQueryName)) || 1;
  const currentPoint = searchParams.get(pointIdQueryName) || '';

  const handleViewClick = (view: string) => {
    setView(view);
  };

  useEffect(() => {
    api.point.getPoints().then((points) => setStreetsList(points));
  }, []);

  useEffect(() => {
    api.catalog.getBikes(currentPage, currentPoint).then((bikes) => {
      setBikesList(bikes);
    });
  }, [currentPage, currentPoint]);

  const handleModal = (bike: Bike | null) => {
    setOpenedBikeModal(bike);
  };

  return (
    <div className={styles.catalogWrapper}>
      <Tabs
        streetsList={streetsList}
        bikesNumber={bikesList ? bikesList.totalItems : 0}
        onViewChange={handleViewClick}
      />

      {isFullCatalog && (
        <div className={clsx(view === 'dots' ? styles.catalogDots : styles.catalogLines)}>
          {bikesList.itemsInPage.map((bike) =>
            view === 'dots' ? (
              <FreeBikeCard key={bike._id} bike={bike} isBooked={false} onClick={() => handleModal(bike)} />
            ) : (
              <FreeBikeLine key={bike._id} bike={bike} onClick={() => handleModal(bike)} />
            )
          )}
        </div>
      )}

      {openedBikeModal && <FreeBikeModal bike={openedBikeModal} onClose={handleModal} />}

      {!isFullCatalog && <EmptyCatalog description={t('Велосипеды закончились')} />}

      <div className={styles.footer}>
        {isFullCatalog && <Paging totalPages={bikesList?.pages}></Paging>}
        <Footer />
      </div>
    </div>
  );
};
