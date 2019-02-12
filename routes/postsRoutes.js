const express = require("express");
const router = express.Router();

const postsDB = require("../data/db");

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title) {
    const errorMessage = "Please provide a title for the post.";
    res.status(400).json({ errorMessage });
  } else if (!contents) {
    const errorMessage = "Please provide some contents for the post.";
    res.status(400).json({ errorMessage });
  } else {
    postsDB
      .insert({ title, contents })
      .then(newPost => {
        const { id } = newPost;
        postsDB
          .findById(id)
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
      res.status(500).json({ error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  postsDB.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        const message = `No post with the specified ID [${id}] exists.`;
        res.status(404).json({ message });
      }
    })
    .catch(err => {
      const error =
        "The information for the specified post could not be retrieved.";
      res.status(500).json({ error });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  postsDB.findById(id)
    .then(post => {
      if (post.length) {
        postsDB.remove(id)
          .then(deletions => {
            if (deletions === 1) {
              res.status(200).json(post);
            } else if (deletions > 1) {
              const error =
                "ERROR: MORE THAN ONE POST WAS INADVERTENTLY DELETED!";
              res.status(500).json({ error });
            } else {
              const error =
                "The post could not be removed (error in deletion process).";
              res.status(500).json({ error });
            }
          })
          .catch(err => {
            const error =
              "The post could not be removed (error in resolving DELETE request).";
            res.status(500).json({ error });
          });
      } else {
        const message = `No post with the specified ID [${id}] exists.`;
        res.status(404).json({ message });
      }
    })
    .catch(err => {
      const error =
        "The post could not be removed (error in checking post data).";
      res.status(500).json({ error });
    });
});

module.exports = router;
