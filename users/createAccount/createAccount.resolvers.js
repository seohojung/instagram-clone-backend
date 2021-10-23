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
          throw new Error("This username/e-mail exists already.");
        }
        const encrypterPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: encrypterPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return e;
        return {
          ok: false,
          error: "Cant create account.",
        };
      }
    },
  },
};
