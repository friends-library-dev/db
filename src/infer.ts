import { ClientConfig, ClientType, getClient } from './Client';

export function inferWeb(href: string, token?: string, path?: string): ClientType {
  let env: ClientConfig['env'];
  if (
    href.includes(`https://deploy-preview-`) ||
    (href.startsWith(`https://`) && href.includes(`--staging`))
  ) {
    env = `staging`;
  } else if (href.startsWith(`http://`)) {
    env = `dev`;
  } else {
    env = `production`;
  }
  return getClient({ env, token, path });
}

export function inferNode(
  process: { argv: string[]; env: Record<string, string | undefined> },
  pattern?: string,
  fetch?: WindowOrWorkerGlobalScope['fetch'],
  path?: string,
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

  return getClient({ env, token, fetch, path });
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
