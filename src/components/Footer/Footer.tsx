import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.css';

interface FooterProps {
  company?: string;
  year?: string;
  docs?: string;
  docsLink?: string;
}

export const Footer = ({
  company = 'СКБ Контур',
  year = 'с 1988 года',
  docs = 'Правовые документы',
  docsLink = 'https://kontur.ru/about/policy',
}: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <hr className={styles.footerLine} />
      <span className={styles.footerText}>
        <span>
          <span className={styles.footerHeader}>{t(company)} </span>
          {t(year)}
        </span>
        <a href={docsLink} target="blank">
          {t(docs)}
        </a>
      </span>
    </footer>
  );
};
