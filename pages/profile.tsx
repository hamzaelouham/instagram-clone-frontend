import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components';

const ProfilePage: NextPage = () => {
  return (
    <div className="bg-gray-50 h-full dark:bg-dark dark:text-white">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default ProfilePage;
