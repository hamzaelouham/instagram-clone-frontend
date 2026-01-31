import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
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
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, httpLink]),
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
