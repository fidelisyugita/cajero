import {api} from './api';

const categories = [
  {
    id: '1',
    name: 'Beverage',
  },
  {
    id: '2',
    name: 'Food',
  },
];

export type AddProductCategoryRequestProps = {
  id: string;
  name: string;
};

export type GetProductCategoiresParamsRequestProps = {};

export type GetProductCategoiresSuccessResponseProps = {
  data: {
    id: string;
    name: string;
  }[];
};

type DeleteProductCategoryBodyRequestProps = string;

export const productCategoryApi = api.injectEndpoints({
  endpoints: build => ({
    addProductCategory: build.mutation<
      undefined,
      AddProductCategoryRequestProps
    >({
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          productCategoryApi.util.updateQueryData(
            'getProductCategories',
            undefined,
            draft => {
              draft.unshift(arg);
            },
          ),
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
    deleteProductCategory: build.mutation<
      undefined,
      DeleteProductCategoryBodyRequestProps
    >({
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          productCategoryApi.util.updateQueryData(
            'getProductCategories',
            undefined,
            draft => {
              return draft.filter(df => df.id !== arg);
            },
          ),
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
    getProductCategories: build.query<{id: string; name: string}[], undefined>({
      keepUnusedDataFor: 86400,
      providesTags: () => ['Categories'],
      query: params => ({
        method: 'GET',
        params,
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
      transformResponse: async () => {
        return categories;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
} = productCategoryApi;
