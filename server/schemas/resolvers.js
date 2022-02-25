const { User } = require("../models");

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  // getMe that returns only info about current user
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
          return userData;
        } catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
   // CREATE USER
   createUser: async (parent, { email, password }) => {
    const user = await User.create({ email, password });
    const token = signToken(user);
    return { token, user };
  },
    // LOGIN USER
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
