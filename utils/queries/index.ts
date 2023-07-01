import { gql } from "@apollo/client";

export const LoginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const RegisterQuery = gql`
  mutation Register($data: RegisterInput) {
    register(data: $data) {
      id
    }
  }
`;