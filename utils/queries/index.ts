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

export const GET_EXPLORE_POSTS = gql`
  query ExplorePosts {
    explorePosts {
      id
      imageUrl
      caption
      likesCount
      hasLiked
      author {
        id
        name
        image
      }
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      id
      type
      read
      createdAt
      sender {
        id
        name
        image
      }
      post {
        id
        imageUrl
      }
    }
  }
`;

export const NOTIFICATION_CREATED_SUBSCRIPTION = gql`
  subscription OnNotificationCreated {
    notificationCreated {
      id
      type
      read
      createdAt
      sender {
        id
        name
        image
      }
      post {
        id
        imageUrl
      }
    }
  }
`;
