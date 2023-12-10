import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apiDomain } from "../config";

const client = new ApolloClient({
  uri: `${apiDomain}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
