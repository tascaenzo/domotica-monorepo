import { useState } from 'react';

const baseUrl = 'http://192.168.1.71:3000/api';

export interface FetchInterface {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  query?: string;
}

export const useFetch = <T>({ method, endpoint, query }: FetchInterface) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const fatchData = async (body?: unknown) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => response.json());

      setData(response as unknown as T);

      return response as unknown as T;
    } catch (error) {
      setError(error);
      console.log(error);

      return null;
    }
  };

  return { fatchData, data, error };
};
