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

export function suggestAmounts(payment: number) {
  // Set of predefined denominations
  const denominations = [100000, 50000, 20000, 10000, 5000, 2000, 1000];

  // Sort the denominations in descending order
  denominations.sort((a, b) => b - a);

  // Calculate suggested amounts
  const suggestions = [];
  let remainingAmount = payment;

  for (const denomination of denominations) {
    const count = Math.floor(remainingAmount / denomination);
    if (count > 0) {
      suggestions.push({amount: denomination, count});
      remainingAmount %= denomination;
    }
  }

  return suggestions;
}
