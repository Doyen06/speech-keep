const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

studentSchema = new Schema({
  firstName:  String,
  lastName:   String,
  email:      String,
  username:   String,
  password:   String,
  section: {type: Schema.Types.ObjectId, ref: 'Section'},
  role: {
    type: String,
    enum: ['TEACHER', 'STUDENT'],
    default: 'STUDENT'
  }
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
