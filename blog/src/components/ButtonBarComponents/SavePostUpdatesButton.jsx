import React, { useContext } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function SavePostUpdatesButton(props) {
  const { updatePost } = useContext(PostsContext);

  return (
    <div
      className="blog-app__button-bar__save-post-updates"
      onClick={updatePost}
    >
      SAVE
    </div>
  );
}

export default SavePostUpdatesButton;
