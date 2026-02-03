import type { NextPage } from 'next';
import Head from 'next/head';
import { Header, Navigation, NormalGrid, ReverseGrid } from '../../components';

import { useQuery } from '@apollo/client';
import { GET_EXPLORE_POSTS } from '../../utils/queries';

const SearchPage: NextPage = () => {
  const { data, loading, error } = useQuery(GET_EXPLORE_POSTS);

  const explorePosts = data?.explorePosts || [];

  // Chunk posts by 5
  const chunks = [];
  for (let i = 0; i < explorePosts.length; i += 5) {
    if (explorePosts.slice(i, i + 5).length === 5) {
      chunks.push(explorePosts.slice(i, i + 5));
    }
  }

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <Head>
        <title>Explore • Instagram </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* explore main  */}
      <main className="container mt-11 md:mt-14 h-screen lg:max-w-[935px]">
        <div className="mx-[2px] md:px-5 md:py-6  h-full pb-20">
          {loading && <div className="p-10 text-center">Loading...</div>}

          {chunks.map((chunk, index) => {
            if (index % 2 === 0) {
              return <NormalGrid key={index} posts={chunk} />;
            } else {
              return <ReverseGrid key={index} posts={chunk} />;
            }
          })}

          {!loading && explorePosts.length < 5 && (
            <div className="grid grid-cols-3 gap-[2px] md:gap-6 pt-[2px] md:pt-6">
              {explorePosts.map((post: any) => (
                <img
                  key={post.id}
                  src={post.imageUrl}
                  className="ex-img aspect-square"
                  alt=""
                />
              ))}
            </div>
          )}

          {!loading && explorePosts.length === 0 && (
            <div className="flex justify-center items-center py-20 text-gray-400">
              No posts to explore yet.
            </div>
          )}
        </div>
      </main>
      <Navigation />
    </div>
  );
};
export default SearchPage;
