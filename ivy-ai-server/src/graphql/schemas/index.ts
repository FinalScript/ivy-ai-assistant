import { makeExecutableSchema } from '@graphql-tools/schema';
import { UserSchema } from './User.schema';
import { resolvers } from '../resolvers';

export const schema = makeExecutableSchema({
  typeDefs: [UserSchema],
  resolvers,
});
