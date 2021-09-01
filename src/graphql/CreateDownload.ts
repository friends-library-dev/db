/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDownloadInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateDownload
// ====================================================

export interface CreateDownload_download {
  __typename: 'Download';
  id: UUID | null;
}

export interface CreateDownload {
  download: CreateDownload_download;
}

export interface CreateDownloadVariables {
  input: CreateDownloadInput;
}
