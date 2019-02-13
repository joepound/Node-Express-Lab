import React, { useContext, useEffect } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function PostInfoDisplay(props) {
  const { selectedPost, setIsInUpdateMode, toggleUpdateMode } = useContext(
    PostsContext
  );
  useEffect(() => setIsInUpdateMode(false), [selectedPost]);

  return selectedPost ? (
    <section className="blog-app__selected-info">
      <img
        className="blog-app__selected-info__edit-btn"
        src="images/edit-icon.png"
        alt="Edit Post"
        onClick={toggleUpdateMode}
      />
      <h2 className="blog-app__selected-info__title">{selectedPost.title}</h2>
      <div className="blog-app__selected-info__contents">
        <label className="blog-app__selected-info__contents__label">Post contents:</label>
        <p className="blog-app__selected-info__contents__content">
          {selectedPost.contents}
        </p>
      </div>
    </section>
  ) : null;
}

export default PostInfoDisplay;
