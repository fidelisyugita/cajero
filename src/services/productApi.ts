/* eslint-disable sort-keys-fix/sort-keys-fix */
// www.themealdb.com/api/json/v1/1/search.php?f=a
import {ProductProps} from '../interfaces/CommonInterface';
import {api} from './api';

export type GetProductsParamsRequestProps = {
  f: string;
};

export type GetProductsSuccessResponseProps = {
  meals: {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: any;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: any;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strSource: string;
    strImageSource: any;
    strCreativeCommonsConfirmed: any;
    dateModified: any;
  }[];
};

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<ProductProps[], GetProductsParamsRequestProps>({
      providesTags: (_result, _error, arg) => [{id: arg.f, type: 'Products'}],
      query: params => ({
        method: 'GET',
        params,
        url: 'https://www.themealdb.com/api/json/v1/1/search.php',
      }),
      transformResponse: async (data: GetProductsSuccessResponseProps) => {
        return data.meals.map(item => ({
          id: item.idMeal,
          name: item.strMeal,
          price: Number(generateRandomFoodPrice(10000, 100000)),
          thumbnail: item.strMealThumb,
          variants: {
            size: {
              items: {
                small: {
                  name: 'Small',
                  price: 0,
                },
                normal: {
                  name: 'Normal',
                  price: Number(generateRandomFoodPrice(1000, 2000)),
                },
                large: {
                  name: 'Large',
                  price: Number(generateRandomFoodPrice(3000, 5000)),
                },
                extraLarge: {
                  name: 'Extra Large',
                  price: Number(generateRandomFoodPrice(5000, 7000)),
                },
              },
              name: 'Size',
              required: true,
              type: 'single',
            },
            topping: {
              items: {
                bubble: {
                  name: 'Bubble',
                  price: Number(generateRandomFoodPrice(1000, 5000)),
                },
                kitkat: {
                  name: 'Kitkat',
                  price: Number(generateRandomFoodPrice(1000, 5000)),
                },
                oreo: {
                  name: 'Oreo',
                  price: Number(generateRandomFoodPrice(1000, 5000)),
                },
                tublerone: {
                  name: 'Tublerone',
                  price: Number(generateRandomFoodPrice(1000, 5000)),
                },
              },
              max: 2,
              name: 'Topping',
              required: false,
              type: 'multiple',
            },
          },
        }));
      },
    }),
  }),
  overrideExisting: true,
});

export const {useGetProductsQuery, useLazyGetProductsQuery} = productApi;

function generateRandomFoodPrice(min: number, max: number) {
  // Generate a random decimal between 0 and 1, and scale it to the price range
  const randomDecimal = Math.random();
  const randomPrice = min + randomDecimal * (max - min);

  // Round the price down to the nearest multiple of 100
  const roundedPrice = Math.floor(randomPrice / 100) * 100;

  // Format the price with the Indonesian Rupiah symbol (Rp)
  return roundedPrice.toFixed(0);
}
