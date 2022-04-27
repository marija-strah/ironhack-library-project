const router = require("express").Router();
const bcryptjs = require('bcryptjs');

const User = require("../models/User.model");

const saltRounds = 10;


// REGISTRATION: display form
router.get("/register", (req, res, next) => {
    //res.send("mwa");  --> to check if the app works, after adding route to app.js
    res.render("auth/register");
});


// REGISTRATION: process form
router.post("/register", (req, res, next) => {

    const { email, password } = req.body; //ES6 object destructuring

    if( !email || !password){
        res.render("auth/register", {errorMessage: "Please provide email and password"});
        return; // if we dont return, bcrypt executes regardless the error
    }

    bcryptjs
        .genSalt(saltRounds)        // returns a promise, synchronous operation
        .then( salt => {
            return bcryptjs.hash(password, salt);  // string we want to hash is the user-provided pw
        })
        .then( hash => {
            console.log("hashedPassword...", hash);

            const userDetails = {
                email,
                passwordHash: hash
            }

            return User.create(userDetails)
        })
        .then ( userFromDB => {
            res.send("user was created")
        })
        .catch(error => {
            console.log("Error creating account", error);
            next(error);
        })
})

// login - display form
router.get("/login", (req, res, next) => {
    res.render("auth/login")
})


// login - process form
router.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    if( !email || !password){
        res.render("auth/login", {errorMessage: `Please provide email and password`});
        return;     // if we dont return, bcrypt executes regardless
    }

    User.findOne({email: email})
        .then( userFromDB => {
            if( !userFromDB ) {
                //user doesn't exist
                res.render('auth/login', { errorMessage: 'Incorrect credentials (no user with that email address).' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                //res.send("login successful")
                res.render('auth/user-profile', {user: userFromDB}); // cant do redirect YET bc we dont have that ROUTE
            } else {
                //login failed (password doesn't match)
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch( error => {
            console.log("Error getting user details from DB", error);
            next(error);
        });

})

//PROFILE PAGE
router.get('/user-profile', (req, res, next) => {
    res.render('auth/user-profile');
});

module.exports = router;