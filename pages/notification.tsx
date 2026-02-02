import {
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { Activity, Header, LoadingComponent, Navigation } from "../components";
import { HomeIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Head from "next/head";

const InstaPage: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <LoadingComponent /> */}
      <Activity />
      <Navigation />
    </div>
  );
};

export default InstaPage;
