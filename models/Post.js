const mongoose = require ('mongoose');
const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
date: { type: Date, default: Date.now }
});
const PostSchema = new mongoose.Schema ({
  date: { type: Date, default: Date.now },
  author: String,
  topic: String,
  title: String,
  content: String,
  comments: [CommentSchema]
});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
