import React from "react";

import { PostInfoForm, PostSelect, PostInfoDisplay } from ".";

function PostContainer(props) {
  return (
    <main>
      <PostInfoForm />
      <PostSelect />
      {/* <PostInfoDisplay /> */}
    </main>
  );
}

export default PostContainer;
