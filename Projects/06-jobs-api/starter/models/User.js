const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a valid Email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    minlength: 6,
  },
});

// using function it will always point to "this" document, but if we use arrow function it won't bind to "this".Since we are not sending BadRequest so all these lines here is unnecessary., but if we are considering badrequest then it is required.In mongoose 5.x if we remove next it's still going to work.
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //   next();
});

// instance method to generate token
/* UserSchema.methods.getName = function () {
  return this.name;
}; */
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
