import React from "react";
import { useQuery } from "@apollo/client";
import { Post } from "./";
import { GET_POST } from "../utils/queries";

// const posts = [
//   {
//     id: 123,
//     username: "amaza",
//     userImag: "/images/avatars/default.png",
//     Imag: "/images/users/raphael/1.jpg",
//     coption: "hello from react instagram chellonges",
//   },
//   {
//     id: 124,
//     username: "hamza",
//     userImag: "/images/avatars/dali.jpg",
//     Imag: "/images/users/raphael/2.jpg",
//     coption: "hello from react instagram chellonges",
//   },
// ];

export const Posts = () => {
  const { loading, error, data } = useQuery(GET_POST);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! {error.message}</>;
  return (
    <div>
      {data.getAllPosts.map((post: any) => (
        <Post
          key={post.id}
          postId={post.id}
          username={post?.author?.name}
          Imag={post?.imageUrl}
          userImag={post?.author.image}
          coption={post.caption}
        />
      ))}
    </div>
  );
};
