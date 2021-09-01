import fetch from 'cross-fetch';
import Orders from './Orders';
import Downloads from './Downloads';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default class Client {
  public orders: Orders;
  public downloads: Downloads;
  public apollo: ApolloClient<NormalizedCacheObject>;

  public constructor(endpoint: string, token: string) {
    this.orders = new Orders(this);
    this.downloads = new Downloads(this);

    const httpLink = createHttpLink({ uri: endpoint, fetch });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    });

    this.apollo = new ApolloClient({
      link: from([httpLink, authLink]),
      cache: new InMemoryCache(),
    });
  }
}
