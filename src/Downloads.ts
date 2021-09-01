import type { Result } from 'x-ts-utils';
import { gql } from '@apollo/client';
import { Uuid } from '@friends-library/types';
import { CreateDownloadInput } from './types';
import Client from './Client';
import { CreateDownload, CreateDownloadVariables } from './graphql/CreateDownload';
import * as convert from './convert';

export default class Downloads {
  public constructor(private client: Client) {}

  public async create(input: CreateDownloadInput): Promise<Result<{ id: Uuid }>> {
    try {
      const variables: CreateDownloadVariables = {
        input: {
          documentId: input.documentId,
          editionType: convert.toGraphQL.editionType(input.editionType),
          format: convert.toGraphQL.downloadFormat(input.format),
          isMobile: input.isMobile,
          audioQuality: input.audioQuality
            ? convert.toGraphQL.audioQuality(input.audioQuality)
            : undefined,
          audioPartNumber: input.audioPartNumber,
          os: input.os,
          browser: input.browser,
          platform: input.platform,
          userAgent: input.userAgent,
          referrer: input.referrer,
          ip: input.ip,
          city: input.city,
          region: input.region,
          postalCode: input.postalCode,
          country: input.country,
          latitude: input.latitude,
          longitude: input.longitude,
          source: convert.toGraphQL.downloadSource(input.source),
        },
      };
      const { data } = await this.client.apollo.mutate<CreateDownload>({
        mutation: CREATE_DOWNLOAD,
        variables,
      });

      if (!data || !data.download.id) {
        return { success: false, error: `Unexpected missing data` };
      }
      return { success: true, value: { id: data.download.id } };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : `Unexpected error`,
      };
    }
  }
}

const CREATE_DOWNLOAD = gql`
  mutation CreateDownload($input: CreateDownloadInput!) {
    download: createDownload(input: $input) {
      id
    }
  }
`;
