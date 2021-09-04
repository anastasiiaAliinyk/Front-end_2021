import { useState } from 'react';

export const useRequestState = <T = any>(requestFunc: (...args: any[]) => Promise<T>): [
  boolean,
  (...args: any[]) => Promise<T>
] => {
  const [requestInProgress, setRequestInProgress] = useState(false);

  const doRequest = async (...args: any[]): Promise<T> => {
    setRequestInProgress(true);
    try {
      return await requestFunc(...args);
    } finally {
      setRequestInProgress(false);
    }
  }

  return [
    requestInProgress,
    doRequest
  ]
}
