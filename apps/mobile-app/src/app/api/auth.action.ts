import { FetchInterface } from '../hooks/use-fetch';

export const signInAction: FetchInterface = {
  method: 'POST',
  endpoint: '/auth/signin',
};

export const getProfileAction: FetchInterface = {
  method: 'GET',
  endpoint: '/auth/profile',
};
