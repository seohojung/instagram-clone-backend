import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult!
  }
`;
