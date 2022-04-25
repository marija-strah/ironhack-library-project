const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
    Book.find()
        .then((booksArr) => {
            res.render("books/books-list", { books: booksArr });
        })
        .catch(err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});


router.get("/books/create", (req, res, next) => {
    res.render("books/book-create");
})


router.post("/books/create", (req, res, next) => {
  const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
}

Book.create(newBook)
  .then((bookFromDB) => {
    
    res.redirect("/books");
  })
  .catch(err => {
    console.log("error creating book on DB", err);
    next(err);
  });

// res.send("processing post request");
})


router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then((bookDetails) => {
            res.render("books/book-details", bookDetails);
        })
        .catch(err => {
            console.log("error getting book details from DB", err)
            next(err);
        });
})



module.exports = router;