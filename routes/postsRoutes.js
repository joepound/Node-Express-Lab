const express = require("express");
const router = express.Router();

const postsDB = require("../data/db");

router.post("/", (req, res) => {
  const newPost = req.body;

  if (!newPost.title) {
    const errorMessage = "Please provide a title for the post.";
    res.status(400).json({ errorMessage });
  } else if (!newPost.contents) {
    const errorMessage = "Please provide some contents for the post.";
    res.status(400).json({ errorMessage });
  } else {
    postsDB
      .insert(newPost)
      .then(newPost => {
        const { id } = newPost;
        postsDB.findById(id)
          .then(addedPost => res.status(201).json(addedPost))
          .catch(err => {
            const error =
              "A post was created but an error occurred in retrieving the data for that post.";
            res.status(500).json({ error });
          });
      })
      .catch(err => {
        const error =
          "There was an error while saving the post to the database.";
        res.status(500).json({ error });
      });
  }
});

router.get("/", (req, res) => {
  postsDB
    .find()
    .then(posts => res.json(posts))
    .catch(err => {
      const error = "The posts information could not be retrieved.";
      res.status(500).json({error});
    });
});

module.exports = router;
