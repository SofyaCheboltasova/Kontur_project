import React from 'react';

import styles from './ScanQrModal.module.css';

interface ModalProps {
  bikeImg: string;
  qrCode: string;
  onClick: () => void;
}

export const ScanQrModal = ({ bikeImg, qrCode, onClick }: ModalProps) => {
  return (
    <div className={styles.content}>
      <img className={styles.bikeImg} src={bikeImg} alt="Bike Image" />
      <div>
        <img src={qrCode} alt="QR code" className={styles.qr} onClick={onClick}></img>
      </div>
    </div>
  );
};
