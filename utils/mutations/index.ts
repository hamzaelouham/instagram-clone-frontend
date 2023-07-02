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
