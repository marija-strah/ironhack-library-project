// const { Schema, model } = require("mongoose");

// // TODO: Please make sure you edit the user model to whatever makes sense in this case
// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: [true,"Email is required"],
//       unique: true, //-> Ideally, should be unique, but its up to you
//       lowercase: true,
//       trim: true  // removes whitespace from both ends
//     },
//     passwordHash: {
//       type: String,
//       required: [true,"Password is required"]
//     }
//   },
//   {
//     // this second object adds extra properties: `createdAt` and `updatedAt`
//     timestamps: true,
//   }
// );

// const User = model("User", userSchema);

// module.exports = User;


const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password required"]
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
