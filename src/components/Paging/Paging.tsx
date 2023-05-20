import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Paging.module.css';

interface PagingProps {
  totalPages: number;
  paramQueryName?: string;
}

export const Paging = ({ totalPages, paramQueryName = 'page' }: PagingProps) => {
  const { t } = useTranslation();
  const [searchParams, updateSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const candidate = searchParams.get(paramQueryName);
    return candidate ? Number(candidate) : 1;
  }, [searchParams]);

  const handlePageChange = (value: number) => {
    searchParams.set(paramQueryName, value.toString());
    updateSearchParams(searchParams);
  };

  const list = new Array(totalPages)
    .fill(null)
    .map((tmp, index) => ({ number: index + 1, isActive: currentPage === index + 1 }));

  return (
    <section className={styles.pagination}>
      {list.map((page) => (
        <a
          key={`num_${page.number}`}
          className={clsx(styles.link, { [styles.active]: page.isActive })}
          onClick={() => handlePageChange(page.number)}
        >
          {page.number}
        </a>
      ))}
      {currentPage < totalPages && (
        <a className={styles.next} onClick={() => handlePageChange(currentPage + 1)}>
          {t('Дальше')}
        </a>
      )}
    </section>
  );
};
