import {
  Uuid,
  AudioQuality,
  EditionType,
  Lang,
  ShippingLevel,
  PrintJobStatus,
  DownloadFormat,
  DownloadSource,
  OrderSource,
} from '@friends-library/types';

export interface CreateDownloadInput {
  documentId: Uuid;
  editionType: EditionType;
  format: DownloadFormat;
  isMobile: boolean;
  audioQuality?: AudioQuality;
  audioPartNumber?: number;
  os?: string;
  browser?: string;
  platform?: string;
  userAgent?: string;
  referrer?: string;
  ip?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  source: DownloadSource;
}

export interface UpdateOrderInput {
  id: Uuid;
  printJobId?: number;
  printJobStatus?: PrintJobStatus;
}

export interface Order {
  id: Uuid;
  lang: Lang;
  paymentId: string;
  amount: number;
  taxes: number;
  shipping: number;
  shippingLevel: ShippingLevel;
  ccFeeOffset: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  printJobId?: number;
  printJobStatus: PrintJobStatus;
  source: OrderSource;
  items: Array<{
    title: string;
    documentId: Uuid;
    editionType: EditionType;
    quantity: number;
    unitPrice: number;
  }>;
  address: {
    name: string;
    street: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type CreateOrderInput = Omit<Order, 'createdAt' | 'updatedAt' | 'id'> & {
  id?: Uuid;
};
