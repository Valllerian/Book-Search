const { User } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


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
            createUser: async (parent, args) => {
                const user = await User.create(args);
                const token = signToken(user);
                return { token, user };
            },
            login: async (
                parent, { email, password }) => {
                const user = await User.findOne({ email });
    
                if (!user) {
                    throw new AuthenticationError('No user with this email exists');
                }
    
                const correctPassword = await user.isCorrectPassword(password);
    
                if (!correctPassword) {
                    throw new AuthenticationError('Incorrect password!');
                }
    
                const token = signToken(user);
                return { token, user };
    
            },
    
        }
};


module.exports = resolvers;