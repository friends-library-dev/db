/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AudioQuality {
  hq = 'hq',
  lq = 'lq',
}

export enum DownloadSource {
  app = 'app',
  podcast = 'podcast',
  website = 'website',
}

export enum EditionType {
  modernized = 'modernized',
  original = 'original',
  updated = 'updated',
}

export enum Format {
  appEbook = 'appEbook',
  epub = 'epub',
  m4b = 'm4b',
  mobi = 'mobi',
  mp3 = 'mp3',
  mp3Zip = 'mp3Zip',
  podcast = 'podcast',
  speech = 'speech',
  webPdf = 'webPdf',
}

export enum Lang {
  en = 'en',
  es = 'es',
}

export enum OrderSource {
  internal = 'internal',
  website = 'website',
}

export enum PrintJobStatus {
  accepted = 'accepted',
  bricked = 'bricked',
  canceled = 'canceled',
  pending = 'pending',
  presubmit = 'presubmit',
  rejected = 'rejected',
  shipped = 'shipped',
}

export enum ShippingLevel {
  expedited = 'expedited',
  express = 'express',
  ground = 'ground',
  groundHd = 'groundHd',
  mail = 'mail',
  priorityMail = 'priorityMail',
}

export interface CreateDownloadInput {
  audioPartNumber?: number | null;
  audioQuality?: AudioQuality | null;
  browser?: string | null;
  city?: string | null;
  country?: string | null;
  documentId: UUID;
  editionType: EditionType;
  format: Format;
  ip?: string | null;
  isMobile: boolean;
  latitude?: string | null;
  longitude?: string | null;
  os?: string | null;
  platform?: string | null;
  postalCode?: string | null;
  referrer?: string | null;
  region?: string | null;
  source: DownloadSource;
  userAgent?: string | null;
}

export interface CreateOrderInput {
  addressCity: string;
  addressCountry: string;
  addressName: string;
  addressState: string;
  addressStreet: string;
  addressStreet2?: string | null;
  addressZip: string;
  amount: number;
  ccFeeOffset: number;
  email: string;
  id?: UUID | null;
  items: Item[];
  lang: Lang;
  paymentId: string;
  printJobId?: number | null;
  printJobStatus: PrintJobStatus;
  shipping: number;
  shippingLevel: ShippingLevel;
  source: OrderSource;
  taxes: number;
}

export interface Item {
  documentId: UUID;
  editionType: EditionType;
  quantity: number;
  title: string;
  unitPrice: number;
}

export interface UpdateOrderInput {
  id: UUID;
  printJobId?: number | null;
  printJobStatus?: PrintJobStatus | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
