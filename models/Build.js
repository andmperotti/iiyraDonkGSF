const mongoose = require('mongoose')

const BuildSchema = new mongoose.Schema({
  buildName: {
    type: String,
    required: true,
  },
  buildCharacterName:{
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  buildResource: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Build', BuildSchema)
