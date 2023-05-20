import moment from 'moment';
import { i18n } from '../i18n';

export const stringToDate = (start: string, end: string) => {
  const currentLanguage = i18n.language;
  if (currentLanguage === 'ch') {
    moment.locale('zh-cn');
  } else {
    moment.locale(currentLanguage);
  }

  const startDate = moment(start);
  const endDate = moment(end);

  const startToStr = startDate.format('D MMMM HH:mm');
  const endToStr = endDate.format('D MMMM HH:mm');

  if (startDate.isSame(endDate, 'day')) {
    return startToStr + '–' + endDate.format('HH:mm');
  } else {
    return startToStr + '–' + endToStr;
  }
};
