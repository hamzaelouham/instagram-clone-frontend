import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetAllPosts {
    getAllPosts {
      id
      caption
      imageUrl

      author {
        name
        iamge
      }
    }
  }
`;
