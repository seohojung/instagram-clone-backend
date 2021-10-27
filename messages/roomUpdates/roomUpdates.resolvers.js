import { withFilter } from "apollo-server";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error("You shall not see this.");
        }
        // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#filtering-events
        // withFilter requires 2 functions as arguments:
        return withFilter(
          // first function returns asyncIterator
          () => pubsub.asyncIterator(NEW_MESSAGE),
          // second function returns true or false
          // Input is in the form of (payload, variables)
          // Also okay to unpack the objects and write ({ roomUpdates}, { id }) directly
          // Here, payload refers to the content of our subscription (not to be confused with the text of sent messages)
          (payload, variables) => {
            return payload.roomUpdates.roomId === variables.id;
          }
        )(root, args, context, info);
      },
    },
  },
};
