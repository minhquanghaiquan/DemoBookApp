const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
    pageCount: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  userId: {
      type: String,
      required: true
  },
  bookId: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('books', bookSchema)
