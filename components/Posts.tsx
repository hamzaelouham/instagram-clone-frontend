import React from "react";
import { useQuery } from "@apollo/client";
import { InView } from "react-intersection-observer";
import { Post, Spiner } from "./";
import { GET_POST } from "../utils/queries";

export const Posts = () => {
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    GET_POST,
    {
      variables: { first: 2 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const hasNextPage = data?.posts?.pageInfo?.hasNextPage;
  const endCursor = data?.posts?.pageInfo?.endCursor;

  if (loading) return <Spiner />;
  if (error) return <>Error! {error.message}</>;

  return (
    <div>
      {data?.posts.edges.map(({ node }: any) => (
        <Post
          key={node.id}
          postId={node.id}
          username={node?.author?.name}
          Imag={node?.imageUrl}
          userImag={node?.author.image}
          coption={node.caption}
        />
      ))}
      {networkStatus === 3 && <Spiner />}
      {hasNextPage ? (
        <InView
          onChange={(inView) => {
            if (inView) {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.posts.edges = [
                    ...prevResult.posts.edges,
                    ...fetchMoreResult.posts.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }
          }}
        />
      ) : (
        <p className="my-10 text-center font-medium">
          You've reached the end!{" "}
        </p>
      )}
    </div>
  );
};
