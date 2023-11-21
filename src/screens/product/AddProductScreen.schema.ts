import * as yup from 'yup';

export const schema = yup.object({
  category: yup.string().label('Category'),
  commission: yup.string().label('Commission'),
  commissionType: yup.string().label('Commission Type'),
  image: yup
    .object()
    .shape({
      type: yup.string().required(),
      value: yup.string().required(),
    })
    .label('Product Picture')
    .required(),
  price: yup.string().label('Price').required(),
  productCode: yup.string().label('Product Code'),
  productName: yup.string().label('Product Name').required(),
  tax: yup.string().label('Tax'),
  variant: yup.array().label('Variant'),
});
