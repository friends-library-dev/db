export { gql } from '@apollo/client';
export { getClient, ClientConfig, ClientType } from './Client';

export function writable<T>(apolloReadOnlyObject: T): T {
  return JSON.parse(JSON.stringify(apolloReadOnlyObject));
}
