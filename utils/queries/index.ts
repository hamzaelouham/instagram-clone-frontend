import { gql } from "@apollo/client";

export const GET_POST = gql`
  query Posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          caption
          imageUrl

          author {
            name
            image
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
