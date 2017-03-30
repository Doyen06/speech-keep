const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

videoSchema = new Schema({
  creator: String,
  video: String,
  assignment: String,
  comments: [{commenter: String,
             comment: String}],
  section: {type: Schema.Types.ObjectId, ref: 'Section'}
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
