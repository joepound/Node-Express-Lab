import React from "react";

import { HeaderContainer } from "./components/HeaderComponents";
import { PostContainer } from "./components/PostComponents";
import { ButtonBarContainer } from "./components/ButtonBarComponents";

function App(props) {
  return (
    <div className="blog-app">
      <HeaderContainer />
      <PostContainer />
      <ButtonBarContainer />
    </div>
  );
}

export default App;
