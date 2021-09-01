/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_order {
  __typename: 'Order';
  id: UUID | null;
}

export interface CreateOrder {
  order: CreateOrder_order;
}

export interface CreateOrderVariables {
  input: CreateOrderInput;
}
