import { SignInResponseInterface } from '@domotica/shared/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

const baseUrl = 'http://192.168.1.70:3000/api';

export interface FetchInterface {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  query?: string;
}

export const useFetch = <T>({ method, endpoint, query }: FetchInterface) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const fatchData = async (body?: unknown) => {
    const auth: string | null = await AsyncStorage.getItem('auth');
    let token: string | null = null;

    if (auth) {
      token = (JSON.parse(auth) as SignInResponseInterface).accessToken;
    }

    try {
      const response = trackPromise(
        new Promise((done) => {
          fetch(`${baseUrl}${endpoint}`, {
            method,
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth ? token : ''}`,
            },
            body: JSON.stringify(body),
          })
            .then((response) => done(response.json()))
            .catch((error) => {
              setError(error);
              done(null);
            });
        })
      );

      setData(response as unknown as T);

      return response as unknown as T;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  return {
    fatchData,
    data,
    error,
  };
};
