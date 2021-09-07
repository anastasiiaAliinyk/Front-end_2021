import { useState } from 'react';

export type RequestInProgressStateT = boolean | null;

export const useRequestState = <T = any>(requestFunc: (...args: any[]) => Promise<T>): [
  RequestInProgressStateT,
  (...args: any[]) => Promise<T>
] => {
  const [requestInProgress, setRequestInProgress] = useState<RequestInProgressStateT>(null);

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
