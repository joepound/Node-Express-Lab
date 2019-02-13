import React, { useContext } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function AddPostButton(props) {
  const { addPost } = useContext(PostsContext);

  return (
    <div className="blog-app__button-bar__add-post" onClick={addPost}>
      +
    </div>
  );
}

export default AddPostButton;
