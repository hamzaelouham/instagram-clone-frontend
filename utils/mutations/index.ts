import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $password: String!
    $fullname: String
    $name: String
  ) {
    register(
      email: $email
      password: $password
      fullname: $fullname
      name: $name
    ) {
      id
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      id
    }
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($id: String!) {
    toggleLike(id: $id) {
      id
      likesCount
      hasLiked
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($text: String!, $postId: String!) {
    addComment(text: $text, postId: $postId) {
      id
      text
      author {
        id
        name
        image
      }
    }
  }
`;
