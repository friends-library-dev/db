import {
  AudioQuality,
  EditionType,
  DownloadFormat,
  DownloadSource,
  PrintJobStatus,
  Lang,
  ShippingLevel,
  OrderSource,
} from '@friends-library/types';
import * as GQL from '../graphql/globalTypes';

export function downloadFormat(format: DownloadFormat): GQL.Format {
  switch (format) {
    case `app-ebook`:
      return GQL.Format.appEbook;
    case `epub`:
      return GQL.Format.epub;
    case `m4b`:
      return GQL.Format.m4b;
    case `mobi`:
      return GQL.Format.mobi;
    case `mp3`:
      return GQL.Format.mp3;
    case `mp3-zip`:
      return GQL.Format.mp3Zip;
    case `podcast`:
      return GQL.Format.podcast;
    case `speech`:
      return GQL.Format.speech;
    case `web-pdf`:
      return GQL.Format.webPdf;
  }
}

export function editionType(editionType: EditionType): GQL.EditionType {
  switch (editionType) {
    case `original`:
      return GQL.EditionType.original;
    case `modernized`:
      return GQL.EditionType.modernized;
    case `updated`:
      return GQL.EditionType.updated;
  }
}

export function orderSource(source: OrderSource): GQL.OrderSource {
  switch (source) {
    case `internal`:
      return GQL.OrderSource.internal;
    case `website`:
      return GQL.OrderSource.website;
  }
}

export function lang(lang: Lang): GQL.Lang {
  switch (lang) {
    case `en`:
      return GQL.Lang.en;
    case `es`:
      return GQL.Lang.es;
  }
}

export function audioQuality(quality: AudioQuality): GQL.AudioQuality {
  switch (quality) {
    case `LQ`:
      return GQL.AudioQuality.lq;
    case `HQ`:
      return GQL.AudioQuality.hq;
  }
}

export function downloadSource(downloadSource: DownloadSource): GQL.DownloadSource {
  switch (downloadSource) {
    case `website`:
      return GQL.DownloadSource.website;
    case `app`:
      return GQL.DownloadSource.app;
    case `podcast`:
      return GQL.DownloadSource.podcast;
  }
}

export function printJobStatus(printJobStatus: PrintJobStatus): GQL.PrintJobStatus {
  switch (printJobStatus) {
    case `accepted`:
      return GQL.PrintJobStatus.accepted;
    case `bricked`:
      return GQL.PrintJobStatus.bricked;
    case `canceled`:
      return GQL.PrintJobStatus.canceled;
    case `pending`:
      return GQL.PrintJobStatus.pending;
    case `presubmit`:
      return GQL.PrintJobStatus.presubmit;
    case `rejected`:
      return GQL.PrintJobStatus.rejected;
    case `shipped`:
      return GQL.PrintJobStatus.shipped;
  }
}

export function shippingLevel(shippingLevel: ShippingLevel): GQL.ShippingLevel {
  switch (shippingLevel) {
    case `EXPRESS`:
      return GQL.ShippingLevel.express;
    case `GROUND`:
      return GQL.ShippingLevel.ground;
    case `GROUND_HD`:
      return GQL.ShippingLevel.groundHd;
    case `MAIL`:
      return GQL.ShippingLevel.mail;
    case `PRIORITY_MAIL`:
      return GQL.ShippingLevel.priorityMail;
    case `EXPEDITED`:
      return GQL.ShippingLevel.expedited;
  }
}
