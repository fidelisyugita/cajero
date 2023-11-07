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
