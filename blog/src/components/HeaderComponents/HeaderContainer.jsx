import React from "react";

function HeaderContainer(props) {
  return (
    <header className="blog-app__header">
      <img
        className="blog-app__header__app-logo"
        src="images/logo.png"
        alt="Blog app logo"
      />
      <h1 className="blog-app__header__app-name">You No De Blog</h1>
    </header>
  );
}

export default HeaderContainer;
