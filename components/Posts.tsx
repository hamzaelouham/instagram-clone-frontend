import React from "react";
import { useQuery } from "@apollo/client";
import { InView } from "react-intersection-observer";
import { Post } from "./";
import { GET_POST } from "../utils/queries";
import { LoadingComponent } from "./LoadingComponent";

export const Posts = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POST, {
    variables: { first: 2 },
  });

  const hasNextPage = data?.posts?.pageInfo?.hasNextPage;
  const endCursor = data?.posts?.pageInfo?.endCursor;

  if (loading) return <>Loading...</>;
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
