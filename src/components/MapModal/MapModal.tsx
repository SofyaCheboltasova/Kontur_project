import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Modal } from '../Modal';
import MapRu from '../../img/map.png';
import MapEng from '../../img/MapEng.png';
import MapCh from '../../img/MapCh.png';

export const MapModal = () => {
  const { t } = useTranslation();
  const [modalActive, setModalActive] = useState(true);

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

  const handleClose = () => {
    setModalActive(!modalActive);
  };

  return modalActive ? (
    <Modal width={1032} title={t('Пункты проката')} onClose={handleClose}>
      <div>{getMapImg()}</div>
    </Modal>
  ) : null;
};
