const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

userSchema = new Schema({
  firstName: String,
  lastName: String,
  preferredName: String,
  userName: String,
  password: String,
  email: String,
  photo: String,
  class: String,
  role: {
    type: String,
    enum : ['TEACHER', 'STUDENT'],
    default : 'TEACHER'
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
