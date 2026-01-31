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
          likesCount
          hasLiked
          author {
            id
            name
            image
          }
          comments {
            id
            text
            author {
              id
              name
              image
            }
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

export const GET_STORIES = gql`
  query GetStories {
    getStories {
      id
      imageUrl
      author {
        id
        name
        image
      }
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query GetSuggestions {
    getSuggestions {
      id
      name
      image
    }
  }
`;
