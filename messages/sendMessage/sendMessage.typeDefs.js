import { gql } from "apollo-server";

export default gql`
  type Mutation {
    sendMessage(text: String!, roomId: Int, userId: Int): MutationResult!
  }
`;
