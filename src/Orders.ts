import { gql } from '@apollo/client';
import { Result } from 'x-ts-utils';
import { PrintJobStatus, Uuid } from '@friends-library/types';
import { CreateOrderInput, Order, UpdateOrderInput } from './types';
import Client from './Client';
import { GetOrder, GetOrderVariables, GetOrder_order } from './graphql/GetOrder';
import { GetOrders, GetOrdersVariables } from './graphql/GetOrders';
import { UpdateOrder, UpdateOrderVariables } from './graphql/UpdateOrder';
import { UpdateOrders, UpdateOrdersVariables } from './graphql/UpdateOrders';
import { CreateOrder, CreateOrderVariables } from './graphql/CreateOrder';
import * as convert from './convert';

export default class Orders {
  public constructor(private client: Client) {}

  public async findById(id: Uuid): Promise<Result<Order>> {
    try {
      const variables: GetOrderVariables = { id };
      const { data } = await this.client.apollo.query<GetOrder>({
        query: FIND_BY_ID,
        variables,
      });
      return {
        success: true,
        value: mapOrder(data.order),
      };
    } catch (error: unknown) {
      return failure(error);
    }
  }

  public async findByPrintJobStatus(status: PrintJobStatus): Promise<Result<Order[]>> {
    try {
      const variables: GetOrdersVariables = {
        status: convert.toGraphQL.printJobStatus(status),
      };
      const { data } = await this.client.apollo.query<GetOrders>({
        query: ORDERS_BY_PRINT_JOB_STATUS,
        variables,
      });
      return {
        success: true,
        value: data.orders.map(mapOrder),
      };
    } catch (error: unknown) {
      return failure(error);
    }
  }

  public async save(input: UpdateOrderInput): Promise<Result<{ id: Uuid }>> {
    try {
      const variables: UpdateOrderVariables = { input: mapUpdateOrderInput(input) };
      const { data } = await this.client.apollo.mutate<UpdateOrder>({
        mutation: UPDATE_ORDER,
        variables,
      });

      if (!data || !data.order.id) {
        throw new Error(`Unexpected missing data`);
      }

      return {
        success: true,
        value: { id: data.order.id },
      };
    } catch (error: unknown) {
      return failure(error);
    }
  }

  public async saveAll(input: UpdateOrderInput[]): Promise<Result<Array<{ id: Uuid }>>> {
    try {
      const variables: UpdateOrdersVariables = { input: input.map(mapUpdateOrderInput) };
      const { data } = await this.client.apollo.mutate<UpdateOrders>({
        mutation: UPDATE_ORDERS,
        variables,
      });

      if (!data) {
        throw new Error(`Unexpected missing data`);
      }

      return {
        success: true,
        value: data.orders.map((order) => {
          if (!order.id) {
            throw new Error(`Unexpected missing order id`);
          }
          return {
            id: order.id,
          };
        }),
      };
    } catch (error: unknown) {
      return failure(error);
    }
  }

  public async create(input: CreateOrderInput): Promise<Result<{ id: Uuid }>> {
    const variables: CreateOrderVariables = {
      input: {
        id: input.id,
        lang: convert.toGraphQL.lang(input.lang),
        paymentId: input.paymentId,
        amount: input.amount,
        taxes: input.taxes,
        shipping: input.shipping,
        shippingLevel: convert.toGraphQL.shippingLevel(input.shippingLevel),
        ccFeeOffset: input.ccFeeOffset,
        email: input.email,
        printJobId: input.printJobId,
        printJobStatus: convert.toGraphQL.printJobStatus(input.printJobStatus),
        addressName: input.address.name,
        addressStreet: input.address.street,
        addressStreet2: input.address.street2,
        addressCity: input.address.city,
        addressState: input.address.state,
        addressZip: input.address.zip,
        addressCountry: input.address.country,
        source: convert.toGraphQL.orderSource(input.source),
        items: input.items.map((item) => ({
          title: item.title,
          documentId: item.documentId,
          editionType: convert.toGraphQL.editionType(item.editionType),
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    };
    try {
      const { data } = await this.client.apollo.mutate<CreateOrder>({
        mutation: CREATE_ORDER,
        variables,
      });

      if (!data || !data.order.id) {
        throw new Error(`Unexpected missing data`);
      }

      return {
        success: true,
        value: { id: data.order.id },
      };
    } catch (error: unknown) {
      return failure(error);
    }
  }
}

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    order: createOrder(input: $input) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    order: updateOrder(input: $input) {
      id
    }
  }
`;

const UPDATE_ORDERS = gql`
  mutation UpdateOrders($input: [UpdateOrderInput!]!) {
    orders: updateOrders(input: $input) {
      id
    }
  }
`;

const ORDERS_BY_PRINT_JOB_STATUS = gql`
  query GetOrders($status: PrintJobStatus!) {
    orders: getOrders(printJobStatus: $status) {
      id
      email
      lang
      createdAt
      updatedAt
      amount
      taxes
      shipping
      ccFeeOffset
      paymentId
      printJobId
      printJobStatus
      shippingLevel
      addressName
      addressStreet
      addressStreet2
      addressCity
      addressState
      addressZip
      addressCountry
      source
      items {
        title
        documentId
        editionType
        quantity
        unitPrice
      }
    }
  }
`;

const FIND_BY_ID = gql`
  query GetOrder($id: UUID!) {
    order: getOrder(id: $id) {
      id
      email
      lang
      createdAt
      updatedAt
      amount
      taxes
      shipping
      ccFeeOffset
      paymentId
      printJobId
      printJobStatus
      shippingLevel
      addressName
      addressStreet
      addressStreet2
      addressCity
      addressState
      addressZip
      addressCountry
      source
      items {
        title
        documentId
        editionType
        quantity
        unitPrice
      }
    }
  }
`;

function mapUpdateOrderInput(input: UpdateOrderInput): UpdateOrderVariables['input'] {
  return {
    id: input.id,
    printJobId: input.printJobId,
    printJobStatus: input.printJobStatus
      ? convert.toGraphQL.printJobStatus(input.printJobStatus)
      : undefined,
  };
}

function mapOrder(order: GetOrder_order): Order {
  if (!order.id) {
    throw new Error(`Unexpected missing order.id`);
  }
  if (!order.createdAt) {
    throw new Error(`Unexpected missing order.createdAt`);
  }
  if (!order.updatedAt) {
    throw new Error(`Unexpected missing order.updatedAt`);
  }
  return {
    id: order.id,
    lang: convert.toFLP.lang(order.lang),
    paymentId: order.paymentId,
    amount: order.amount,
    taxes: order.taxes,
    shipping: order.shipping,
    shippingLevel: convert.toFLP.shippingLevel(order.shippingLevel),
    ccFeeOffset: order.ccFeeOffset,
    email: order.email,
    printJobId: order.printJobId ?? undefined,
    printJobStatus: convert.toFLP.printJobStatus(order.printJobStatus),
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.updatedAt),
    source: convert.toFLP.orderSource(order.source),
    items: order.items.map((item) => ({
      title: item.title,
      documentId: item.documentId,
      editionType: item.editionType,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    address: {
      name: order.addressName,
      street: order.addressStreet,
      street2: order.addressStreet2 ?? undefined,
      city: order.addressCity,
      state: order.addressState,
      zip: order.addressZip,
      country: order.addressCountry,
    },
  };
}

function failure(error: unknown): { success: false; error: string } {
  return {
    success: false,
    error: error instanceof Error ? error.message : `Unexpected error`,
  };
}
