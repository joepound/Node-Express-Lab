import React, { useContext, useEffect } from "react";

import { PostsContext } from "../../providers/PostsProvider";

function PostSelect(props) {
  const { posts, selectedPost, getPosts, handlePostSelect } = useContext(
    PostsContext
  );
  useEffect(() => getPosts(), []);

  return (
    <div className="blog-app__select">
      <label className="blog-app__select__label" htmlFor="selectedPost">
        View any post below:{" "}
      </label>
      <select
        className="blog-app__select__dropdown"
        id="selectedPost"
        name="setSelectedPost"
        value={selectedPost ? selectedPost.id : ""}
        onChange={handlePostSelect}
      >
        {posts.length ? (
          <>
            <option disabled hidden value="">
              Select a post...
            </option>
            {posts.map(post => (
              <option
                key={post.id}
                className="blog-app__select__dropdown__option"
                value={post.id}
              >
                {post.title}
              </option>
            ))}
          </>
        ) : (
          <option disabled hidden value="">
            Add some posts....
          </option>
        )}
      </select>
    </div>
  );
}

export default PostSelect;
