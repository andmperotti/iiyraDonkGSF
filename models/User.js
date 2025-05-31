const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  discordName: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

// Update comparePassword to return a promise
userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
