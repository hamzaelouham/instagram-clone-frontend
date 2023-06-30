import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { ProgressBar } from "../components";
import "../styles/globals.css";
import "../styles/style.css";
import { useApollo } from "../utils/apollo";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const router = useRouter();
  //@ts-ignore
  const store = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const start = () => {
      setIsProgress(true);
    };
    const stop = () => {
      setIsProgress(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router]);

  return (
    <>
      <ApolloProvider client={store}>
        <ProgressBar isAnimating={isProgress} />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
