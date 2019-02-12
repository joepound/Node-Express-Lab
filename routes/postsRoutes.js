const express = require("express");
const router = express.Router();

const postsDB = require("../data/db");

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
