import type { NextPage } from "next";
import Head from "next/head";
import { Header, HomeContent, Navigation } from "../components";

const HomePage: NextPage = () => {
  return (
    <div className="bg-gray-50 h-full dark:bg-dark dark:text-white">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomeContent />
      <Navigation />
    </div>
  );
};

export default HomePage;
