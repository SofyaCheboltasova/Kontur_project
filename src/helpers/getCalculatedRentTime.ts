import { TFunction } from 'i18next';

export const calcCurrentRentTime = (startTime: string, t: TFunction, endTime?: string) => {
  let diffTime;

  if (endTime) {
    diffTime = new Date(endTime).getTime() - new Date(startTime).getTime() + 1;
  } else {
    diffTime = new Date().getTime() - new Date(startTime).getTime();
  }
  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  let minutes = Math.floor((diffTime / (1000 * 60)) % 60);
  if (minutes === 0) minutes += 1;

  if (hours === 0) {
    return `${minutes} ${t('мин')}`;
  } else {
    return `${hours}${t('ч')} ${minutes}${t('мин')}`;
  }
};
