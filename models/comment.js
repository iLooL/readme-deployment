const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ 

  article_id: {
    type: Number
  },

  username: {
    type: String,
    required: [true, "Only users can post comments"]
  },

  text: {
    type: String,
    required: [true, "No blank comments allowed"]
  }
});

module.exports = mongoose.model('Comment', commentSchema); 