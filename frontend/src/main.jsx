import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import GridBackground from './components/ui/GridBackground.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  // TODO => Update uri on production.
  uri: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql",  // URL of GraphQL server.
  cache: new InMemoryCache(), // Cache query results after fetching them.
	credentials: "include",     // Send cookies with every request to server.
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
    </BrowserRouter>
  </StrictMode>,
)
