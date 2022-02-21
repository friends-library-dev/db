import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type Env =
  | {
      env: `infer`;
      pattern?: string;
      process: {
        argv: string[];
        env: Record<string, string | undefined>;
      };
    }
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
    case `infer`:
      return inferClient(options.process, options.pattern, options.fetch);
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

function inferClient(
  process: { argv: string[]; env: Record<string, string | undefined> },
  pattern?: string,
  fetch?: WindowOrWorkerGlobalScope['fetch'],
): ClientType {
  let token: string;
  let env: ClientConfig['env'];
  if (process.argv.includes(`--api-staging`)) {
    env = `staging`;
  } else if (process.argv.includes(`--api-dev`)) {
    env = `dev`;
  } else {
    env = `production`;
  }

  // `DEV` | `STAGING` | `PROD`
  const modeSegment = env.toUpperCase().replace(`UCTION`, ``);
  const placeholder = `{{env}}`;

  if (!pattern) {
    token = requireEnvVar(`FLP_API_TOKEN_${modeSegment}`, process.env);
  } else if (!pattern.includes(placeholder)) {
    throw new Error(`Token input pattern must include \`${placeholder}\``);
  } else {
    const key = pattern.replace(placeholder, modeSegment);
    token = requireEnvVar(key, process.env);
  }

  return getClient({ env, token, fetch });
}

function requireEnvVar(key: string, env: Record<string, string | undefined>): string {
  const value = env[key];
  if (!value) {
    throw new Error(
      `Missing required environment var: \`${key}\` for inferring db client config`,
    );
  }
  return value;
}
