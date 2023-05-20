import { TFunction } from 'i18next';

export const getRentPrice = (priceInMin: number, rentTime: string, t: TFunction) => {
  let matches = rentTime.match(`(\\d+)${t('ч')} (\\d+)${t('мин')}`);
  if (matches) {
    const hours = parseInt(matches[1], 10);
    const minutes = parseInt(matches[2], 10);
    const totalMinutes = hours * 60 + minutes;
    const totalPrice = priceInMin * totalMinutes;
    return Math.trunc(totalPrice);
  }

  matches = rentTime.match(`(\\d+) ${t('мин')}`);
  if (matches) {
    const minutes = parseInt(matches[1], 10);
    const totalPrice = priceInMin * minutes;
    return Math.trunc(totalPrice);
  }
};
