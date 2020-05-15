const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  }
});

const User = mongoose.model('User', userSchema);

mode.exports = { User }

const bcrypt = require('bcrypt');
let SALT = 10;

userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, function(err, salt){
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        } else {
          user.password = hash;
          next();
        }
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(enteredPassword, checkpasswword) {
  bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
    if (err) {
      return checkpasswword(err)
    } else {
      checkpasswword(null, isMatch)
    }
  })
}