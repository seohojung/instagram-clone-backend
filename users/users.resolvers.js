import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      // No need to await because we are directly returning this query without further processing
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMyProfile: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const exists = await client.user
        .findUnique({ where: { username: loggedInUser.username } })
        .following({ where: { id } });
      return exists.length !== 0;
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
