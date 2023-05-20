import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Bike, Order } from '../../../api/Api.types';
import { api } from '../../../api';
import { RentedModal } from '../RentedModal';
import { GetBikeModal } from '../GetBikeModal';
import { ScanQrModal } from '../ScanQrModal';
import { path } from '../../../consts/paths';
import { getBikeImagePath } from '../../../helpers/getBikeImgPath';
export interface FreeBikeProps {
  bike: Bike;
  onClose: (bike: null) => void;
}

export const FreeBikeModal = ({ bike, onClose }: FreeBikeProps) => {
  const [isRented, setIsRented] = useState(false);
  const [order, setOrder] = useState<Order>();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const bikeImg = getBikeImagePath(bike._id);

  const handleStartRentClick = async () => {
    const order = await api.order.createOrder(bike._id);
    setOrder(order);

    const qr = await api.order.getQRCode(order._id);
    setQrCode(qr.code);
  };

  const handleQrClick = () => {
    setIsRented(true);

    if (order?._id) api.order.startRent(order?._id);
    navigate(path.booking, { state: { bike: bike, order: order } });
  };

  const handleClose = () => {
    onClose(null);
    if (order) {
      api.order.deleteOrder(order?._id);
    }
  };

  return (
    <RentedModal bike={bike} isMapOpened isRented={isRented} onClose={handleClose}>
      {!isRented && !qrCode && <GetBikeModal cost={bike.cost} bikeImg={bikeImg} onClick={handleStartRentClick} />}

      {!isRented && qrCode && <ScanQrModal bikeImg={bikeImg} qrCode={qrCode} onClick={handleQrClick} />}
    </RentedModal>
  );
};
