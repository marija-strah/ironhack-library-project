const {Schema, model} = require("mongoose");            // 1 step

const authorSchema = new Schema(            // 2 step   
    {
        name: String,               // 5 step - define model pattern
        favouriteFood: String,          // 6 step - go to book model and change author details
        country: String
    }
);


const Author = model("Author", authorSchema);       // 3 step 

module.exports = Author;            // 4 step 
