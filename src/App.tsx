import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";
import { GlobalStyle } from "./styles/global";
import { AuthProvider } from "./context/auth";
import { ThemeStyleProvider } from "./context/theme";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { USER } from "./utils/constants";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import coke from "./styles/themes/coke";
import pepsi from "./styles/themes/pepsi";

const getToken = () => {
  const token = localStorage.getItem(USER);
  if (token) {
    return JSON.parse(token);
  }
};

const authLink = setContext(async (_, { headers }) => {
  const parsed = getToken();

  return {
    headers: {
      ...headers,
      accept: "application/json",
      authorization: parsed ? `Bearer ${parsed.token}` : "",
    },
  };
});

const baseUrl = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(baseUrl),
  cache: new InMemoryCache(),
});

function App() {
  const { title } = useTheme();

  return (
    <Router>
      <ToastContainer />
      <ApolloProvider client={client}>
        <AuthProvider>
          <ThemeStyleProvider>
            <ThemeProvider theme={title === "coke" ? coke : pepsi}>
              <Routes />
            </ThemeProvider>
            <GlobalStyle />
          </ThemeStyleProvider>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
