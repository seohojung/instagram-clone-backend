import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        // pagination to be added
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
