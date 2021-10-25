import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    photos: [Photo]
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMyProfile: Boolean!
    isFollowing: Boolean!
  }
`;
