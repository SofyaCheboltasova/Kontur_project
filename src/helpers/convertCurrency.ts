import { i18n } from '../i18n';

export const convertCurrency = (priceRubles: number) => {
  const currentLanguage = i18n.language;

  const usdRate = 0.8;
  const cnyRate = 1.2;
  const priceCents = Math.round(priceRubles / usdRate);
  const priceYuan = Math.round(priceRubles / cnyRate);

  if (currentLanguage === 'en') {
    return priceCents;
  }

  if (currentLanguage === 'ch') {
    return priceYuan;
  }

  return priceRubles;
};
