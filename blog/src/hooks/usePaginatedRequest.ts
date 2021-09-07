import { useState } from 'react';

export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

export const usePaginatedRequest = <T = any>(
  requestFunc: (...args: any[]) => Promise<T>,
  totalCountKey: KeysOfType<T, number>,
  limit: number = 20
) => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const doRequest = (...args: any[]): Promise<T> => {
    return requestFunc((page - 1) * limit, limit, ...args)
      .then((data: T) => {
        setTotalItems(data[totalCountKey] as any as number);
        return data;
      });
  };

  const setPageHandler = (page: number) => {
    setPage(page);
  };

  let pages = 1;
  if (totalItems !== null) {
    pages = totalItems / limit;
    if (pages < 1) {
      pages = 1;
    }
  }

  return {
    page,
    pages,
    totalItems,
    doRequest,
    setPage: setPageHandler
  };
};
