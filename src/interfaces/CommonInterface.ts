export type DiscountProps = {
  id: string;
  value: string;
  valueDisplay: string;
  name: string;
  type: string;
};

type DiscountProductProps = {
  type: 'percent' | 'amount';
  value: string;
};

export type ProductOrderProps = ProductProps & {
  discount: DiscountProductProps;
  qty: number;
  note: string;
  productOrderId: string;
  totalPrice: number;
};

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  variants: ProductVariantProps;
}

export type ProductVariantProps = {
  [key: string]: {
    name: string;
    type: string;
    items: VariantItemProps;
    selected?: string[];
    max?: number;
    required: boolean;
  };
};

export type VariantItemProps = {
  [key: string]: {
    name: string;
    price: number;
  };
};
