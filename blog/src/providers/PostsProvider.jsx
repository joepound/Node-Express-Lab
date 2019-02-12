import React, { createContext, useState } from "react";
import axios from "axios";

export const PostsContext = createContext();

function PostProvider(props) {

  const postsContext = {};

  return (
    <PostsContext.Provider value={postsContext}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostProvider;
