const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
  },
  userName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Job', JobSchema)
