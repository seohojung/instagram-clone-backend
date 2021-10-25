import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    user: User!
    photo: Photo!
    text: String!
    isMine: Boolean!
    createdAt: String!
    updateddAt: String!
  }
`;
