import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { inferNode, inferWeb } from './infer';

type Env =
  | {
      env: `infer_node`;
      pattern?: string;
      process: {
        argv: string[];
        env: Record<string, string | undefined>;
      };
    }
  | { env: `infer_web`; href: string; token?: string }
  | { env: `dev`; port?: number; token?: string }
  | { env: `staging`; token?: string }
  | { env: `production`; token?: string }
  | { env: `custom`; endpoint: string; token?: string };

export type ClientConfig = Env & {
  fetch?: WindowOrWorkerGlobalScope['fetch'];
  path?: string;
};

export type ClientType = ApolloClient<NormalizedCacheObject>;

export function getClient(
  options: ClientConfig = { env: `dev` },
): ApolloClient<NormalizedCacheObject> {
  let url: string;
  let token: string | undefined;
  switch (options.env) {
    case `infer_web`:
      return inferWeb(options.href, options.token, options.path);
    case `infer_node`:
      return inferNode(options.process, options.pattern, options.fetch, options.path);
    case `dev`:
      url = `http://127.0.0.1:${options.port ?? 8080}/${options.path ?? `graphql`}`;
      token = options.token;
      break;
    case `staging`:
      url = `https://api--staging.friendslibrary.com/${options.path ?? `graphql`}`;
      token = options.token;
      break;
    case `production`:
      url = `https://api.friendslibrary.com/${options.path ?? `graphql`}`;
      token = options.token;
      break;
    case `custom`:
      url = options.endpoint;
      token = options.token;
      break;
  }

  const httpLink = createHttpLink({ uri: url, fetch: options.fetch });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
