import React from "react";

import { HeaderContainer } from "./components/HeaderComponents";
import { PostContainer } from "./components/PostComponents";

function App(props) {
  return (
    <div className="blog-app">
      <HeaderContainer />
      <PostContainer />
    </div>
  );
}

export default App;
