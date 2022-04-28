const Author = require("../models/Author.model");

const router = require("express").Router();

const {isLoggedIn} = require("../middleware/route-guard");


router.get("/", (req, res, next) => {
    Author.find()
    .then((authorsArr) => {
        res.render("authors/authors-list", { authors: authorsArr });
    })
    .catch(err => {
        console.log("error getting authors from DB", err)
        next(err);
    });
})



module.exports = router;