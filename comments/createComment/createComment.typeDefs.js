import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createComment(photoId: Int!, text: String!): MutationResult!
  }
`;
