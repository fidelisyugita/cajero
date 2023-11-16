import {createSelector} from '@reduxjs/toolkit';

import {RootStateProps} from '../../store';

export const subtotalSelector = createSelector(
  [(state: RootStateProps) => state.menuOrder.orderList],
  orderList => orderList.reduce((acc, ol) => acc + ol.totalPrice, 0),
);

// eslint-disable-next-line sort-exports/sort-exports
export const discountSelector = createSelector(
  [(state: RootStateProps) => state.menuOrder.discount, subtotalSelector],
  (orderDiscount, subtotal) => {
    return orderDiscount?.id
      ? orderDiscount.type === 'amount'
        ? Number(orderDiscount?.value)
        : (subtotal *
            (orderDiscount?.value ? Number(orderDiscount.value) : 0)) /
          100
      : 0;
  },
);

export const paymentMethodSelector = (state: RootStateProps) =>
  state.menuOrder.paymentMethod;

export const totalSelector = createSelector(
  [subtotalSelector, discountSelector],
  (subtotal, discount) => subtotal - discount,
);
