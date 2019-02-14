import React, { createContext, useState } from "react";
import axios from "axios";

export const PostsContext = createContext();

function PostProvider(props) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContents, setNewContents] = useState("");
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);

  const baseURL = "https://joepound-ls-brwawe2.herokuapp.com/api/posts";
  const postsContext = {
    posts,
    selectedPost,
    newTitle,
    newContents,
    isInUpdateMode,

    setIsInUpdateMode,

    textInputSetters: {
      setNewTitle,
      setNewContents
    },

    async getPosts() {
      try {
        const res = await axios.get(`${baseURL}/`);

        res.data.sort((a, b) =>
          a.title.trim().toUpperCase() > b.title.trim().toUpperCase() ? 1 : -1
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    },

    async getPostById(id) {
      try {
        const res = await axios.get(`${baseURL}/${id}`);

        setSelectedPost(res.data);
      } catch (err) {
        console.log(err);
      }
    },

    async addPost() {
      if (!newTitle) {
        alert("Please enter a title first.");
      } else if (!newContents) {
        alert("Please enter some post contents first.");
      } else if (window.confirm("Are you sure you want to add a new post?")) {
        const newPostObj = { title: newTitle, contents: newContents };

        try {
          await axios.post(`${baseURL}/`, newPostObj);
          alert(`Post "${newTitle}" was successfully added.`);

          postsContext.getPosts();
          setNewTitle("");
          setNewContents("");
        } catch (err) {
          console.log(err);
        }
      }
    },

    async deletePost() {
      if (
        window.confirm("Are you sure you want to deleted the selected post?")
      ) {
        try {
          await axios.delete(`${baseURL}/${selectedPost.id}`);
          alert(`Post "${selectedPost.title}" was successfully deleted.`);

          postsContext.getPosts();
          setSelectedPost("");
        } catch (err) {
          console.log(err);
        }
      }
    },

    toggleUpdateMode() {
      const toggledUpdateMode = !isInUpdateMode;

      if (toggledUpdateMode) {
        postsContext.populatePostForm();
      }

      setIsInUpdateMode(toggledUpdateMode);
    },

    populatePostForm() {
      setNewTitle(selectedPost.title);
      setNewContents(selectedPost.contents);
    },

    async updatePost() {
      if (!newTitle) {
        alert("Please enter a title first.");
      } else if (!newContents) {
        alert("Please enter some post contents first.");
      } else if (
        window.confirm("Are you sure you want to update the selected post?")
      ) {
        const postUpdatesObj = { title: newTitle, contents: newContents };

        try {
          const res = await axios.put(`${baseURL}/${selectedPost.id}`, postUpdatesObj);
          alert(`Post "${newTitle}" was successfully updated.`);

          postsContext.getPosts();
          setSelectedPost(res.data);
          setNewTitle("");
          setNewContents("");

          postsContext.toggleUpdateMode();
        } catch (err) {
          console.log(err);
        }
      }
    },

    handleTextInputChange(e) {
      postsContext.textInputSetters[e.currentTarget.name](
        e.currentTarget.value
      );
    },

    handlePostSelect(e) {
      postsContext.getPostById(e.currentTarget.value);
    }
  };

  return (
    <PostsContext.Provider value={postsContext}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostProvider;
