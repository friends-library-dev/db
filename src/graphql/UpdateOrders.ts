/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: UpdateOrders
// ====================================================

export interface UpdateOrders_orders {
  __typename: 'Order';
  id: UUID | null;
}

export interface UpdateOrders {
  orders: UpdateOrders_orders[];
}

export interface UpdateOrdersVariables {
  input: UpdateOrderInput[];
}
