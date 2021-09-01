/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  Lang,
  PrintJobStatus,
  ShippingLevel,
  OrderSource,
  EditionType,
} from './globalTypes';

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_order_items {
  __typename: 'OrderItem';
  title: string;
  documentId: UUID;
  editionType: EditionType;
  quantity: number;
  unitPrice: number;
}

export interface GetOrder_order {
  __typename: 'Order';
  id: UUID | null;
  email: string;
  lang: Lang;
  createdAt: string | null;
  updatedAt: string | null;
  amount: number;
  taxes: number;
  shipping: number;
  ccFeeOffset: number;
  paymentId: string;
  printJobId: number | null;
  printJobStatus: PrintJobStatus;
  shippingLevel: ShippingLevel;
  addressName: string;
  addressStreet: string;
  addressStreet2: string | null;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  source: OrderSource;
  items: GetOrder_order_items[];
}

export interface GetOrder {
  order: GetOrder_order;
}

export interface GetOrderVariables {
  id: UUID;
}
