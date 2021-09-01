import { Lang, ShippingLevel, PrintJobStatus, OrderSource } from '@friends-library/types';
import * as GQL from '../graphql/globalTypes';

export function lang(lang: GQL.Lang): Lang {
  switch (lang) {
    case GQL.Lang.en:
      return `en`;
    case GQL.Lang.es:
      return `es`;
  }
}

export function shippingLevel(shippingLevel: GQL.ShippingLevel): ShippingLevel {
  switch (shippingLevel) {
    case GQL.ShippingLevel.express:
      return `EXPRESS`;
    case GQL.ShippingLevel.ground:
      return `GROUND`;
    case GQL.ShippingLevel.groundHd:
      return `GROUND_HD`;
    case GQL.ShippingLevel.mail:
      return `MAIL`;
    case GQL.ShippingLevel.priorityMail:
      return `PRIORITY_MAIL`;
    case GQL.ShippingLevel.expedited:
      return `EXPEDITED`;
  }
}

export function printJobStatus(printJobStatus: GQL.PrintJobStatus): PrintJobStatus {
  switch (printJobStatus) {
    case GQL.PrintJobStatus.accepted:
      return `accepted`;
    case GQL.PrintJobStatus.bricked:
      return `bricked`;
    case GQL.PrintJobStatus.canceled:
      return `canceled`;
    case GQL.PrintJobStatus.pending:
      return `pending`;
    case GQL.PrintJobStatus.presubmit:
      return `presubmit`;
    case GQL.PrintJobStatus.rejected:
      return `rejected`;
    case GQL.PrintJobStatus.shipped:
      return `shipped`;
  }
}

export function orderSource(source: GQL.OrderSource): OrderSource {
  switch (source) {
    case GQL.OrderSource.internal:
      return `internal`;
    case GQL.OrderSource.website:
      return `website`;
  }
}
