const Book = require("../models/Book.model");

const Author = require("../models/Author.model");

const router = require("express").Router();

router.get("/authors", (req, res, next) => {
  Author.find()
    .then((authorsArr) => {
      res.render("authors/authors-list", { authors: authorsArr });
    })
    .catch((err) => {
      console.log("error displaying authors", err);
      next(err);
    });
});

module.exports = router;
