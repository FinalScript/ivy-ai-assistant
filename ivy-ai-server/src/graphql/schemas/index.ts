import { makeExecutableSchema } from '@graphql-tools/schema';
import { UserSchema } from './User.schema';
import { TimetableSchema } from './Timetable.schema';
import { resolvers } from '../resolvers';
import { CourseSchema } from './Course.schema';

export const schema = makeExecutableSchema({
  typeDefs: [UserSchema, TimetableSchema, CourseSchema],
  resolvers,
});
