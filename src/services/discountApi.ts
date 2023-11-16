// www.themealdb.com/api/json/v1/1/search.php?f=a
import {DiscountProps} from '../interfaces/CommonInterface';
import {currencyPrice} from '../utils/convert';
import {api} from './api';

const discounts = [
  {
    id: '1',
    name: 'Holiday Savings',
    type: 'amount',
    value: 5000,
  },
  {
    id: '2',
    name: 'Morning Brew Combo',
    type: 'percent',
    value: 10,
  },
  {
    id: '3',
    name: 'Weekend Special',
    type: 'amount',
    value: 3000,
  },
  {
    id: '4',
    name: 'Happy Hour Deal',
    type: 'percent',
    value: 15,
  },
  {
    id: '5',
    name: 'Lunchtime Discount',
    type: 'amount',
    value: 2000,
  },
  {
    id: '6',
    name: 'Family Pack Offer',
    type: 'percent',
    value: 20,
  },
  {
    id: '7',
    name: 'Student Discount',
    type: 'amount',
    value: 1500,
  },
  {
    id: '8',
    name: 'Senior Citizens Special',
    type: 'percent',
    value: 12,
  },
  {
    id: '9',
    name: 'Flash Sale',
    type: 'amount',
    value: 4000,
  },
  {
    id: '10',
    name: 'Evening Delight',
    type: 'percent',
    value: 18,
  },
];

export type GetDiscountsParamsRequestProps = {};

export type GetDiscountsSuccessResponseProps = {
  data: {
    id: string;
    name: string;
    type: string;
    value: number;
  }[];
};

type AddDiscountBodyRequestProps = DiscountProps;

type DeleteDiscountBodyRequestProps = string;

export const discountApi = api.injectEndpoints({
  endpoints: build => ({
    addDiscount: build.mutation<undefined, AddDiscountBodyRequestProps>({
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          discountApi.util.updateQueryData('getDiscounts', undefined, draft => {
            draft.unshift(arg);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
    }),
    deleteDiscount: build.mutation<undefined, DeleteDiscountBodyRequestProps>({
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          discountApi.util.updateQueryData('getDiscounts', undefined, draft => {
            return draft.filter(df => df.id !== arg);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
    }),
    getDiscounts: build.query<DiscountProps[], undefined>({
      keepUnusedDataFor: 86400,
      providesTags: () => ['Discounts'],
      query: params => ({
        method: 'GET',
        params,
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
      transformResponse: async (data: GetDiscountsSuccessResponseProps) => {
        return discounts.map(item => ({
          ...item,
          valueDisplay:
            item.type === 'amount'
              ? currencyPrice(item.value)
              : `${item.value}%`,
        }));
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddDiscountMutation,
  useDeleteDiscountMutation,
  useGetDiscountsQuery,
  useLazyGetDiscountsQuery,
} = discountApi;
