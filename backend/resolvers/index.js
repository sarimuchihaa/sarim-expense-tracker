// This function is used to combine multiple resolver objects into one.
import { mergeResolvers } from "@graphql-tools/merge";


// Importing individual resolver objects from their respective files.
// Contain logic for handling GraphQL queries, mutations.
import userResolver from './user.resolver.js';
import transactionResolver from './transaction.resolver.js';

// mergeResolvers function to combine userResolver and transactionResolver into single resolver object.
// This allows GraphQL server to have unified resolver map that includes all logic from individual resolvers.
const mergedResolvers = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolvers;