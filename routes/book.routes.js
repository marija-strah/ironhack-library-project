// const Book = require("../models/Book.model");

// const router = require("express").Router();

// router.get("/books", (req, res, next) => {
//     Book.find()
//         .then( (booksArr) => {

//           console.log("hello");
//             console.log(booksArr)

//             res.render("books/books-list", {books: booksArr});
//         })
//         .catch( err => {
//             console.log("error getting books from DB", err)
//             next(err);
//         });
// });


// module.exports = router;


const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
    Book.find()
        .then( (booksArr) => {
          console.log("hhiihi");
          console.log(booksArr);
            res.render("books/books-list", {books: booksArr});
        })
        .catch( err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});


router.get("/books/:bookId", (req, res, next) => {
  const id = req.params.bookId;

  Book.findById(id)
        .then((bookDetails) => {
            console.log(bookDetails)
            //res.send("success")
            res.render("books/book-details", {book: bookDetails})
        })
        .catch(err => {
            console.log("error getting books from DB", err)
            next(err);
        });
  
})


module.exports = router;