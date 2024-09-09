// This function is used to combine multiple typeDef objects into one.
import { mergeTypeDefs } from "@graphql-tools/merge";


// Importing individual typeDef objects from their respective files.
// Define schema for different parts of GraphQL API such as users and transactions.
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

// mergeTypeDefs function to combine userTypeDef and transactionTypeDef into single typeDef object.
// This allows GraphQL server to have unified schema that includes all types and operations defined in individual typeDefs.
const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;