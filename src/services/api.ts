import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import config from '../config';
import {RootStateProps} from '../store';

const baseQuery = () => {
  return fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: (headers, {getState}) => {
      const {isSignIn} = (getState() as RootStateProps)?.session;

      if (isSignIn) {
        // headers.set('authorization', `Bearer ${user.accessToken}`);
        // headers.set('x-subscriber-id', String(user.id));
      }
    },
  });
};

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery()(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ['Products', 'Discounts', 'Categories'],
});
