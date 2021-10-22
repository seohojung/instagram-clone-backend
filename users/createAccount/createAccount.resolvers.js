import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // Check if username or email is already in DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("This username/e-mail address exists already.");
        }

        // Hash password
        const encryptedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: encryptedPassword,
          },
        });
      } catch (e) {
        return e;
      }

      // Save and return the user
    },
  },
};
