import {ProductOrderProps} from '../interfaces/CommonInterface';
import {currencyPrice} from './convert';

function getTotalSelectedVariantPrice(variants: ProductOrderProps['variants']) {
  let totalPrice = 0;
  if (variants) {
    Object.keys(variants).forEach(variant => {
      if (variants[variant].selected) {
        totalPrice += variants[variant].selected.reduce((acc, variantItem) => {
          return acc + variants[variant].items[variantItem].price;
        }, 0);
      }
    });
  }

  return totalPrice;
}

export function getFinalPriceItem(item: ProductOrderProps) {
  const {discount, price, qty, variants} = item;
  const discountValue =
    discount?.type === 'amount'
      ? Number(discount.value || 0)
      : (Number(discount?.value || 0) / 100) * price;

  const variantValue = getTotalSelectedVariantPrice(variants);

  const totalPrice = (price - discountValue + variantValue) * qty;

  return totalPrice;
}
