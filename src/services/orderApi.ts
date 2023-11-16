// www.themealdb.com/api/json/v1/1/search.php?f=a
import dayjs from 'dayjs';

import {subtotalSelector, totalSelector} from '../screens/menu/Menu.selector';
import {store} from '../store';
import {api} from './api';

type OrderBodyRequestProps = {};

type OrderPaymentBodyRequestProps = {
  orderId: string;
  paymentMethod: string;
  cash: number;
};

export const orderApi = api.injectEndpoints({
  endpoints: build => ({
    order: build.mutation<undefined, OrderBodyRequestProps>({
      query: body => ({
        body,
        method: 'POST',
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
    }),
    orderPayment: build.mutation<undefined, OrderPaymentBodyRequestProps>({
      query: body => ({
        body,
        method: 'POST',
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
      transformResponse: (_data, _meta, arg) => {
        const state = store.getState();
        const totalPrice = totalSelector(state);
        return {
          cash: arg.cash,
          change: arg.cash - totalPrice,
          date: dayjs().format('ddd, D MMM YYYY - HH:mm'),
          subtotal: subtotalSelector(state),
          totalPrice,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {useOrderMutation, useOrderPaymentMutation} = orderApi;
