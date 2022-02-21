import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type Mode =
  | { mode: `dev`; port?: number }
  | { mode: `staging` }
  | { mode: `production` }
  | { mode: `custom`; endpoint: string };

export type TokenInput =
  | string
  | { env: Record<string, string | undefined>; pattern?: string };

export type ClientOptions = Mode & {
  token?: TokenInput;
  fetch?: WindowOrWorkerGlobalScope['fetch'];
  path?: string;
};

export function getClient(
  options: ClientOptions = { mode: `dev` },
): ApolloClient<NormalizedCacheObject> {
  let url: string;
  switch (options.mode) {
    case `dev`:
      url = `http://localhost:${options.port ?? 8080}/${options.path ?? `graphql`}`;
      break;
    case `staging`:
      url = `https://api--staging.friendslibrary.com/${options.path ?? `graphql`}`;
      break;
    case `production`:
      url = `https://api.friendslibrary.com/${options.path ?? `graphql`}`;
      break;
    case `custom`:
      url = options.endpoint;
      break;
  }

  const httpLink = createHttpLink({ uri: url, fetch: options.fetch });
  const token = resolveToken(options.mode, options.token);

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

function resolveToken(mode: string, input?: TokenInput): string | undefined {
  if (typeof input !== `object`) {
    return input;
  }

  // `DEV` | `STAGING` | `PROD`
  const modeSegment = mode.toUpperCase().replace(`UCTION`, ``);

  const { pattern, env } = input;
  if (!pattern) {
    return env[`FLP_API_TOKEN_${modeSegment}`];
  }

  const placeholder = `{{env}}`;
  if (!pattern.includes(placeholder)) {
    throw new Error(`Token input pattern must include \`${placeholder}\``);
  }

  const key = pattern.replace(placeholder, modeSegment);
  return env[key];
}
