import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { api } from '../../api';
import styles from './Booking.module.css';
import { Bike, Order } from '../../api/Api.types';
import stylesCatalog from '../Catalog/Catalog.module.css';
import { EmptyCatalog } from '../../components/EmptyCatalog';
import { getBikeImagePath } from '../../helpers/getBikeImgPath';
import { RentedModal } from '../../components/Bike/RentedModal';
import { FreeBikeCard } from '../../components/Bike/FreeBikeCard';
import { DateRangeModal } from '../../components/Bike/DateRangeModal';
import { ReturnBikeModal } from '../../components/Bike/ReturnBikeModal';
import { calcCurrentRentTime } from '../../helpers/getCalculatedRentTime';

export const Booking: React.FC = () => {
  const { t } = useTranslation();
  const [bookedOrders, setBookedOrders] = useState<Order[]>();
  const [bookedBikes, setBookedBikes] = useState<Bike[]>();
  const [completedOrders, setCompletedOrders] = useState<Order[]>();
  const [completedBikes, setCompletedBikes] = useState<Bike[]>();

  const [bikeImg, setBikeImg] = useState('');
  const [order, setOrder] = useState<Order | null>();
  const [rentTime, setRentTime] = useState(`0 ${t('мин')}`);
  const [modal, setModal] = useState<Bike | null>(null);
  const [isBikeReturned, setIsBikeReturned] = useState(false);
  const [rentButton, setRentButtonClicked] = useState(false);
  const { state } = useLocation();

  const isEmptyBooking = bookedBikes?.length === 0 && completedBikes?.length === 0;
  const isEmptyCurrentBooking = bookedBikes?.length === 0 && completedBikes?.length !== 0;

  async function setModalFromCatalog() {
    if (!state) return;
    setModal(state.bike);
    setOrder(state.order);
    setBikeImg(getBikeImagePath(state.bike._id));
  }

  useEffect(() => {
    setModalFromCatalog();
  }, [state]);

  useEffect(() => {
    api.order.getOrders().then((orders) => setBookedOrders(orders));
    api.order.getCompletedOrders().then((orders) => setCompletedOrders(orders));
  }, [rentButton]);

  const getBikes = async (orders: Order[], setBikes: (arg: Bike[] | undefined) => void) => {
    const promises = orders?.map((order) => {
      return api.catalog.getBike(order.bikeId);
    });

    if (promises) {
      const bikes = await Promise.all(promises);
      setBikes(bikes.filter((bike) => bike !== undefined) as Bike[]);
    }
  };

  useEffect(() => {
    if (bookedOrders) {
      getBikes(bookedOrders, setBookedBikes);
    }

    if (completedOrders) {
      getBikes(completedOrders, setCompletedBikes);
    }
  }, [bookedOrders, completedOrders]);

  useEffect(() => {
    if (order && order.start) {
      setRentTime(calcCurrentRentTime(order.start, t, order.end));
    }
  }, [modal]);

  const handleModal = async (bike: Bike | null, bikeId: number, isReturned: boolean) => {
    setModal(bike);
    setIsBikeReturned(isReturned);

    if (!isReturned && bookedOrders) {
      setOrder(bookedOrders[bikeId]);
    }

    if (isReturned && completedOrders) {
      setOrder(completedOrders[bikeId]);
    }

    if (bike) {
      setBikeImg(getBikeImagePath(bike?._id));
    }
  };

  const onReturnClick = () => {
    if (!order) return;

    api.order.stopRent(order?._id).then(() => {
      api.order.getOrder(order?._id).then(setOrder);
      setRentButtonClicked(!rentButton);
      setIsBikeReturned(true);
    });
  };

  return (
    <div>
      <h2 className={clsx(styles.title, { [styles.emptyBookings]: isEmptyCurrentBooking })}>{t('Мои бронирования')}</h2>

      {!isEmptyBooking && (
        <div>
          <div className={stylesCatalog.catalogDots}>
            {bookedBikes?.map((bike, index) => (
              <FreeBikeCard key={bike._id} isBooked bike={bike} onClick={() => handleModal(bike, index, false)} />
            ))}
          </div>

          <h3 className={styles.subtitle}>{t('История бронирований')}</h3>
          <div className={stylesCatalog.catalogDots}>
            {completedBikes?.map((bike, index) => (
              <FreeBikeCard key={index} isBooked bike={bike} onClick={() => handleModal(bike, index, true)} />
            ))}
          </div>
        </div>
      )}

      {modal && (
        <RentedModal bike={modal} isMapOpened onClose={() => setModal(null)}>
          {!isBikeReturned && (
            <ReturnBikeModal rentTime={rentTime} cost={modal.cost} bikeImg={bikeImg} onClick={onReturnClick} />
          )}
          {isBikeReturned && order && (
            <DateRangeModal cost={modal.cost} bikeImg={bikeImg} rentTime={rentTime} order={order} />
          )}
        </RentedModal>
      )}

      {isEmptyBooking && <EmptyCatalog description="Пока не бронировали" />}
    </div>
  );
};
