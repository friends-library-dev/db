/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  PrintJobStatus,
  Lang,
  ShippingLevel,
  OrderSource,
  EditionType,
} from './globalTypes';

// ====================================================
// GraphQL query operation: GetOrders
// ====================================================

export interface GetOrders_orders_items {
  __typename: 'OrderItem';
  title: string;
  documentId: UUID;
  editionType: EditionType;
  quantity: number;
  unitPrice: number;
}

export interface GetOrders_orders {
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
  items: GetOrders_orders_items[];
}

export interface GetOrders {
  orders: GetOrders_orders[];
}

export interface GetOrdersVariables {
  status: PrintJobStatus;
}
