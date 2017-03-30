const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

sectionSchema = new Schema({
  department: String,
  sectionName:  String,
  assignmentName: String,
  video: [{
    link: String,
    
    comments: [String]
  }],

  teacher: {type: Schema.Types.ObjectId, ref: 'User'}
});
const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
