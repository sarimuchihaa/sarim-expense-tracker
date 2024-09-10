import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import { buildContext } from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://expense-tracker-vrg4.onrender.com'], // Add allowed origins here
  credentials: true,
};

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
await connectDB();

// Apply session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new connectMongo(session)({
      uri: process.env.MONGO_URI,
      collection: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport();

// Apply CORS middleware before GraphQL middleware
app.use(cors(corsOptions));

// GraphQL Middleware
app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
