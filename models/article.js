const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({ 

  article_id: {
    type: Number
  },

  title: {
    type: String,
    required: [true, "Title is required"]
  },

  author: {
    type: String
  },

  url: {
    type: String,
    required: [true, "URL is required"]
  },

  summary: {
    type: String,
    required: [true, "Summary can't be blank"]
  }, 

  article_type: {
    type: String,
    required: [true, "Article type is required"]
  },

  upvotes :{
    type: Number,
    default: 0
  }
  
});

module.exports = mongoose.model('Article', articleSchema); 