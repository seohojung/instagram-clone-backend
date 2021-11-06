import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "This username/e-mail exists already.",
          };
        } else {
          const encryptedPassword = await bcrypt.hash(password, 10);
          await client.user.create({
            data: {
              username,
              email,
              firstName,
              lastName,
              password: encryptedPassword,
            },
          });
          return {
            ok: true,
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: "Cannot create account.",
        };
      }
    },
  },
};
