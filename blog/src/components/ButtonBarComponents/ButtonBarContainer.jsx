import React, { useContext } from "react";

import { PostsContext } from "../../providers/PostsProvider";

import { AddPostButton, RemovePostButton, SavePostUpdatesButton } from ".";

function ButtonBarContainer(props) {
  const { selectedPost, isInUpdateMode } = useContext(PostsContext);

  return (
    <footer className="blog-app__button-bar">
      {isInUpdateMode ? <SavePostUpdatesButton /> : <AddPostButton />}
      {selectedPost && <RemovePostButton />}
    </footer>
  );
}

export default ButtonBarContainer;
