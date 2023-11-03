import {api} from './api';

export type LoginSuccessResponseProps = {
  data: {
    anotherLogin: boolean;
    accessToken: string;
    actionUrl: string[];
    cognitoUsername: string;
    deviceId: string;
    expireInMobile: number;
    flag: string;
    flagDateHitMobile: string;
    loginActivityId: number;
    refreshToken: string;
    source: string;
    profile: {
      email: string;
      firstName: string;
      lastName: string;
      id: number;
      groupId: number;
      origin: string;
      username: string;
      roleGroup: string;
      accountManagerId: number;
      accountManagerEmail: string;
      accountManager: string;
      fullName: string;
      initial: string;
    };
  };
  message: string;
  statusCode: number;
};

type LoginBodyRequestProps = {
  email: string;
  password: string;
};

export type LogoutSuccessResponseProps = {
  message: string;
  statusCode: number;
  data: [];
};

type LogoutBodyRequestProps = {
  subscriber_id: number;
};

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginSuccessResponseProps, LoginBodyRequestProps>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth-login',
      }),
    }),
    logout: build.mutation<LogoutSuccessResponseProps, LogoutBodyRequestProps>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth-login',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useLogoutMutation} = authApi;
