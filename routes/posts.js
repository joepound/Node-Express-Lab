const express = require("express");
const router = express.Router();

const postsDB = require("../data/db");

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title) {
    const errorMessage = "Please provide a title for the post.";
    res.status(400).json({ errorMessage });
  } else if (!contents) {
    const errorMessage = "Please provide some contents for the post.";
    res.status(400).json({ errorMessage });
  } else {
    try {
      const newPost = await postsDB.insert({ title, contents });
      const { id } = newPost;

      try {
        const addedPost = await postsDB.findById(id);

        if (addedPost.length === 1) {
          res.status(201).json(addedPost[0]);
        } else if (addedPost.length) {
          const error = "Server error: created a post with a non-unique ID.";
          res.status(500).json({ error });
        } else {
          const error =
            "A post was created but an error occurred in retrieving the data for that post.";
          res.status(500).json({ error });
        }
      } catch (err) {
        const error =
          "A post was created but an error occurred in retrieving the data for that post.";
        res.status(500).json({ error });
      }
    } catch (err) {
      const error = "There was an error while saving the post to the database.";
      res.status(500).json({ error });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await postsDB.find();
    res.status(200).json(posts);
  } catch (err) {
    const error = "The posts information could not be retrieved.";
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await postsDB.findById(id);
    
    if (posts.length === 1) {
      res.status(200).json(posts[0]);
    } else if (posts.length) {
      const error = "Server error: retrieved posts with non-unique ID's";
      res.status(500).json({ error });
    } else {
      const message = `No post with the specified ID [${id}] exists.`;
      res.status(404).json({ message });
    }
  } catch (err) {
    const error =
      "The information for the specified post could not be retrieved.";
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await postsDB.findById(id);

    if (posts.length === 1) {
      try {
        const deletions = await postsDB.remove(id);

        if (deletions === 1) {
          res.status(200).json(posts[0]);
        } else if (deletions > 1) {
          const error = "ERROR: MORE THAN ONE POST WAS INADVERTENTLY DELETED!";
          res.status(500).json({ error });
        } else {
          const error =
            "The post could not be removed (error in deletion process).";
          res.status(500).json({ error });
        }
      } catch (err) {
        const error =
          "The post could not be removed (error in resolving DELETE request).";
        res.status(500).json({ error });
      }
    } else if (posts.length) {
      const error =
        "Server error: deletion was cancelled due to a match with a non-unique ID";
      res.status(500).json({ error });
    } else {
      const message = `No post with the specified ID [${id}] exists.`;
      res.status(404).json({ message });
    }
  } catch (err) {
    const error =
      "The post could not be removed (error in checking post data).";
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title) {
    const errorMessage = "Please provide a title for the post.";
    res.status(400).json({ errorMessage });
  } else if (!contents) {
    const errorMessage = "Please provide some contents for the post.";
    res.status(400).json({ errorMessage });
  } else {
    try {
      const posts = await postsDB.findById(id);

      if (posts.length === 1) {
        try {
          const updates = await postsDB.update(id, { title, contents });

          if (updates === 1) {
            try {
              const updatedPost = await postsDB.findById(id);
              res.status(200).json(updatedPost[0]);
            } catch (err) {
              const error = `The post with ID ${id} was updated but an error occurred in retrieving the updated data.`;
              res.status(500).json({ error });
            }
          } else if (updates > 1) {
            const message =
              "ERROR: MORE THAN ONE POST WAS INADVERTENTLY UPDATED!";
            res.status(500).json({ message });
          } else {
            const message =
              "The post information could not be modified (error in update process).";
            res.status(500).json({ message });
          }
        } catch (err) {
          const message =
            "The post information could not be modified (error in resolving PUT request).";
          res.status(500).json({ message });
        }
      } else if (posts.length) {
        const error =
          "Server error: update was cancelled due to a match with a non-unique ID";
        res.status(500).json({ error });
      } else {
        const message = `No post with the specified ID [${id}] exists.`;
        res.status(404).json({ message });
      }
    } catch (err) {
      const error =
        "The post information could not be modified (error in checking post data).";
      res.status(500).json({ error });
    }
  }
});

module.exports = router;
