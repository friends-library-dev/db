/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: UpdateOrder
// ====================================================

export interface UpdateOrder_order {
  __typename: 'Order';
  id: UUID | null;
}

export interface UpdateOrder {
  order: UpdateOrder_order;
}

export interface UpdateOrderVariables {
  input: UpdateOrderInput;
}
