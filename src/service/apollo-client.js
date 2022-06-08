import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SlicknodeLink from "slicknode-apollo-link";
const slicknodeLink = new SlicknodeLink({
  debug: true, // Writes auth debug info to console, disable in production
});
// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
// >>>>> Your Slicknode endpoint <<<<<<
const SLICKNODE_ENDPOINT = process.env.REACT_APP_SLICKNODE_ENDPOINT;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // Create link chain
  link: ApolloLink.from([
    // Add Slicknode link before HttpLink to add auth headers
    slicknodeLink,
    // ...More links for error handling etc...
    errorLink,
    // Network link to make HTTP requests to the API
    new HttpLink({
      uri: SLICKNODE_ENDPOINT,
      credentials: "same-origin",
      headers: {
        // Uncomment to enable preview mode:
        // 'X-Slicknode-Preview': '1',
        // Uncomment to set default locale:
        // 'X-Slicknode-Locale': 'en-US',
      },
    }),
  ]),
});
export default client;
