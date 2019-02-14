import React, { useContext } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function RemovePostButton(props) {
  const { deletePost } = useContext(PostsContext);

  return (
    <div className="blog-app__button-bar__remove-post" onClick={deletePost}>
      X
    </div>
  );
}

export default RemovePostButton;
