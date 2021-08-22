import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

	* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  body, html {
    height: auto;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

`;
