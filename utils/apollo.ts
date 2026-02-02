import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session: any = await getSession();
  const token = session?.user?.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function createApollo() {
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
        createClient({
          url: (process.env.NEXT_PUBLIC_GRAPHQL_URI || "http://localhost:4000/graphql").replace("http", "ws"),
          connectionParams: async () => {
            console.log("WS fetching session for connectionParams...");
            const session: any = await getSession();
            const token = session?.user?.accessToken;
            console.log("WS token available:", !!token);
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
          on: {
            connected: () => console.log("WS Connected successfully"),
            error: (err) => console.error("WS Connection error:", err),
          }
        })
      )
      : null;

  const splitLink =
    typeof window !== "undefined" && wsLink
      ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        from([authLink, httpLink])
      )
      : from([authLink, httpLink]);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export const initApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApollo();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initApollo(initialState), [initialState]);
  return store;
};
