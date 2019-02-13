import React, { useContext } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function PostInfoForm(props) {
  const { selectedPost, newTitle, newContents, isInUpdateMode, handleTextInputChange } = useContext(PostsContext);

  return (
    <form className="blog-app__info-form">
      {isInUpdateMode && selectedPost && <div className="blog-app__info-form__update-notif">{`[NOW UPDATING: ${selectedPost.title.toUpperCase()}]`}</div>}
      <div className="blog-app__info-form__field">
        <label className="blog-app__info-form__field__label" htmlFor="newTitle">Title: </label>
        <input
          className="blog-app__info-form__field__input textfield"
          id="newTitle"
          name="setNewTitle"
          placeholder="Enter the title of the post"
          required
          value={newTitle}
          onChange={handleTextInputChange}
        />
      </div>
      <div className="blog-app__info-form__field">
        <label className="blog-app__info-form__field__label" htmlFor="newContents">Contents: </label>
        <textarea
          className="blog-app__info-form__field__input textarea"
          id="newContents"
          name="setNewContents"
          placeholder="Say something..."
          required
          value={newContents}
          onChange={handleTextInputChange}
        />
      </div>
    </form>
  );
}

export default PostInfoForm;
