import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

import PostsProvider from "./providers/PostsProvider";
import App from "./App";

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.getElementById("root")
);
