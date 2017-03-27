const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

sectionSchema = new Schema({
  department: String,
  sectionName:  String,

  teacher: {type: Schema.Types.ObjectId, ref: 'User'}
});
const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
