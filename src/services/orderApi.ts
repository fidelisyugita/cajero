// www.themealdb.com/api/json/v1/1/search.php?f=a
import dayjs from 'dayjs';
import ShortUniqueId from 'short-unique-id';

import {DiscountProps} from '../interfaces/CommonInterface';
import {
  discountSelector,
  subtotalSelector,
  totalSelector,
} from '../screens/menu/Menu.selector';
import {RootStateProps, store} from '../store';
import {currencyPrice} from '../utils/convert';
import {api} from './api';

type OrderBodyRequestProps = {};

type OrderPaymentBodyRequestProps = {
  orderId: string;
  paymentMethod: string;
  cash: number;
};
type OrderPaymentResponseSuccess = {
  cash: number;
  change: number;
  date: string;
  subtotal: number;
  totalPrice: number;
  discount?: DiscountProps;
  tax: number;
  transactionID: string;
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
    orderPayment: build.mutation<
      OrderPaymentResponseSuccess,
      OrderPaymentBodyRequestProps
    >({
      query: body => ({
        body,
        method: 'POST',
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
      transformResponse: (_data, _meta, arg) => {
        const state = store.getState() as RootStateProps;
        const totalPrice = totalSelector(state);
        const discount = discountSelector(state);
        const uid = new ShortUniqueId();

        return {
          cash: arg.cash,
          change: arg.cash - totalPrice,
          date: dayjs().format('ddd, D MMM YYYY - HH:mm'),
          discount: state.menuOrder.discount
            ? {
                ...state.menuOrder.discount,
                valueDisplay: `-${currencyPrice(discount)}`,
              }
            : undefined,
          subtotal: subtotalSelector(state),
          tax: 0,
          totalPrice,
          transactionID: uid.rnd(),
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {useOrderMutation, useOrderPaymentMutation} = orderApi;
