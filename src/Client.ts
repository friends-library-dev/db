import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type UriOptions =
  | { env: `dev` }
  | { env: `staging` }
  | { env: `production` }
  | { env: `custom`; uri: string };

type ClientOptions = UriOptions & {
  token?: string | null;
  fetch?: WindowOrWorkerGlobalScope['fetch'];
};

export function getClient(
  options: ClientOptions = { env: `dev` },
): ApolloClient<NormalizedCacheObject> {
  let uri: string;
  switch (options.env) {
    case `dev`:
      uri = `http://localhost:8080/graphql`;
      break;
    case `staging`:
      uri = `https://api--staging.friendslibrary.com/graphql`;
      break;
    case `production`:
      uri = `https://api.friendslibrary.com/graphql`;
      break;
    case `custom`:
      uri = options.uri;
      break;
  }

  const httpLink = createHttpLink({ uri, fetch: options.fetch });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
