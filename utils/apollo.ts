import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient, Client } from 'graphql-ws';
import { getSession } from 'next-auth/react';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let wsClient: Client | null = null;
let wsLink: GraphQLWsLink | null = null;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const session: any = await getSession();
  const token = session?.user?.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Restart WebSocket connection (call after login/logout to refresh auth)
export const restartWsConnection = () => {
  if (wsClient) {
    console.log('UTILS: Restarting WebSocket connection...');
    // Just terminate the connection, the client will auto-reconnect with new session
    wsClient.terminate();
  }
};

function createWsClient(): Client {
  console.log('UTILS: Creating new WS Client singleton...');
  return createClient({
    url: (
      process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:4000/graphql'
    ).replace('http', 'ws'),
    lazy: true,
    retryAttempts: Infinity,
    connectionParams: async () => {
      console.log('UTILS: WS fetching session...');
      const session: any = await getSession();
      const token = session?.user?.accessToken;
      console.log('UTILS: WS token found:', !!token);
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
    on: {
      connecting: () => console.log('UTILS: WS Connecting...'),
      connected: () => console.log('UTILS: WS Connected successfully'),
      closed: (event) => console.log('UTILS: WS Connection closed', event),
      error: (err) => console.error('UTILS: WS Connection error:', err),
    },
  });
}

function createApollo() {
  console.log('UTILS: createApollo (once)');
  if (typeof window !== 'undefined' && !wsClient) {
    wsClient = createWsClient();
    wsLink = new GraphQLWsLink(wsClient);
  }

  const splitLink =
    typeof window !== 'undefined' && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            const isSubscription =
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription';
            console.log(
              `UTILS: splitLink routing. isSubscription=${isSubscription}`
            );
            return isSubscription;
          },
          wsLink,
          from([authLink, httpLink])
        )
      : from([authLink, httpLink]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getNotifications: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
}

export const initApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApollo();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initApollo(initialState), [initialState]);
  return store;
};
